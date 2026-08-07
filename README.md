# ZenGlance

A self-hosted multi-modal content platform built on Cloudflare Workers with Backblaze B2 storage and Valcorner CDN.

## Architecture

```
┌─────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Client    │────▶│  Cloudflare      │────▶│  Backblaze B2   │
│  (Browser)  │     │  Workers         │     │  (Storage)      │
│             │◀────│  (Metadata API)  │◀────│                 │
└─────────────┘     └──────────────────┘     └─────────────────┘
       │
       │ Direct CDN Access
       ▼
┌─────────────────┐
│ Valcorner CDN   │
│ (Content Delivery)
└─────────────────┘
```

### Core Principles

1. **Dual-Channel File Flow**:
   - **Write**: Client → Backblaze B2 (S3 Presigned URL direct upload)
   - **Read**: Client → Valcorner CDN (direct with Token API)
   - **Workers**: Only manages metadata, never touches media files

2. **Valcorner CDN URL Format**:
   - Token: `GET https://cdn.valcorner.qzz.io/api/token` → `{"ticket":"uuid"}`
   - Manifest: `https://cdn.valcorner.qzz.io/zenglance/{content_type}/{content_id}/{manifest_index}.{m3u8|mpd}?ticket={ticket}`
   - Direct: `https://cdn.valcorner.qzz.io/zenglance/{content_type}/{content_id}/{filename}?ticket={ticket}`

3. **Role-Based Upload Permissions**:
   | Role | Allowed Content Types | Encryption |
   |------|----------------------|------------|
   | Official | All types | AES-256-GCM for premium content only |
   | Premium | UGC content only | Never encrypted |
   | Free | No upload | - |

4. **Conditional Encryption**: Only `is_premium=true` content from Official users gets AES-256-GCM encryption

5. **Apple HLS Priority**: All long videos provide HLS fMP4 (.m3u8) for Safari/AVPlayer native playback

## Tech Stack

- **Runtime**: Cloudflare Workers (Hono Framework)
- **Database**: Cloudflare D1 (SQLite — metadata, sessions, OAuth state)
- **Storage**: Backblaze B2 (S3-compatible, private bucket)
- **CDN**: Valcorner CDN
- **Auth**: Valcorner OAuth 2.0 PKCE + D1-backed server sessions
- **Validation**: Zod

## Project Structure

```
src/
├── index.js          # Main entry point, Hono app setup
├── db/
│   ├── index.js      # Database connection
│   └── schema.js     # Drizzle ORM schema (D1 tables) + relations
├── routes/
│   ├── auth.js       # OAuth login/callback, /me, logout, D1 session creation
│   └── upload.js     # Upload request/complete, content list & detail
├── services/
│   ├── b2.js         # Backblaze B2 S3 client, presigned URLs
│   └── valcorner.js  # Valcorner CDN URL builder
├── middleware/
│   └── auth.js       # Session auth middleware + role guard + session helpers
└── utils/
    └── validators.js # Zod schemas, permission logic
migrations/
└── 0001_initial.sql  # D1 database schema (incl. sessions table)
```

## Setup

### Prerequisites

1. Cloudflare account with Workers and D1 enabled
2. Backblaze B2 account with S3-compatible API credentials
3. Valcorner CDN account

### Environment Variables (Secrets)

```bash
wrangler secret put B2_APPLICATION_KEY_ID
wrangler secret put B2_APPLICATION_KEY
wrangler secret put VALCORNER_CLIENT_ID
wrangler secret put VALCORNER_CLIENT_SECRET
```

### Configuration Vars (in `wrangler.jsonc`)

Non-secret runtime configuration, already set with local-dev defaults:

| Var | Purpose |
|-----|---------|
| `B2_API_URL` | B2 native API endpoint (default: `https://api.backblazeb2.com`) |
| `B2_BUCKET_NAME` | B2 bucket name |
| `VALCORNER_REDIRECT_URI` | OAuth callback URL (`/auth/callback`) |
| `VALCORNER_SCOPE` | OAuth scopes (default: `openid email profile`) |
| `VALCORNER_AUTHORIZE_URL` | OAuth authorize endpoint |
| `VALCORNER_TOKEN_URL` | OAuth token exchange endpoint |
| `VALCORNER_USERINFO_URL` | OAuth user info endpoint |
| `FRONTEND_URL` | Frontend origin for post-OAuth redirect with `?session_id=` |

### D1 Database Setup

```bash
# Create D1 database
wrangler d1 create zenglance-db

# Update wrangler.jsonc with the database_id

# Run migrations
wrangler d1 execute zenglance-db --local --file=migrations/0001_initial.sql
wrangler d1 execute zenglance-db --remote --file=migrations/0001_initial.sql
```

## Development

```bash
npm install
npm run dev
```

## Deployment

### Manual

```bash
npm run deploy
```

### GitHub Actions (CI/CD)

A deploy workflow is provided at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). It runs on every push to `main`/`master` and via manual `workflow_dispatch`.

**Pipeline steps:**

1. `npm ci` → install dependencies
2. Inject `D1_DATABASE_ID` secret into `wrangler.jsonc` (replacing the `YOUR_D1_DATABASE_ID` placeholder; falls back to a dummy UUID when the secret is absent so tests still pass on PR branches)
3. Verify all required secrets are configured (only on `main`/`master` or manual dispatch)
4. `npm test -- --run` → run vitest
5. `wrangler d1 execute --remote --file=migrations/0001_initial.sql` → apply migrations (idempotent via `IF NOT EXISTS`)
6. `wrangler deploy` → deploy the Worker and upload all runtime secrets

#### Required GitHub Secrets

Configure these under **Settings → Secrets and variables → Actions → New repository secret**:

| Secret | Purpose | How to obtain |
|--------|---------|---------------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token with Workers/D1 edit perms | [Cloudflare dashboard](https://developers.cloudflare.com/workers/wrangler/ci-cd/#api-token) |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare account ID | Dashboard right sidebar |
| `D1_DATABASE_ID` | D1 数据库 ID（替换 `wrangler.jsonc` 中的占位符） | `wrangler d1 create zenglance-db` 输出 |
| `B2_APPLICATION_KEY_ID` | B2 application key ID（原生 API，非 S3） | B2 console → Account Keys |
| `B2_APPLICATION_KEY` | B2 application key（原生 API） | B2 console → Account Keys |
| `VALCORNER_CLIENT_ID` | Valcorner OAuth client ID | Valcorner admin |
| `VALCORNER_CLIENT_SECRET` | Valcorner OAuth client secret | Valcorner admin |

#### Optional GitHub Variables

Configure these under **Settings → Secrets and variables → Actions → New repository variable** to override the defaults in `wrangler.jsonc` for your production environment:

| Variable | Default | When to override |
|----------|---------|-----------------|
| `D1_DATABASE_NAME` | `zenglance-db` | 数据库名称与 `wrangler.jsonc` 的 `database_name` 保持一致时可不配置 |
| `FRONTEND_URL` | `https://zenglance.example.com` | 换成你的实际前端域名 |
| `B2_API_URL` | `https://api.backblazeb2.com` | 通常不需要改 |
| `VALCORNER_REDIRECT_URI` | `https://zenglance.example.com/auth/callback` | 换成生产环境回调地址 |

> `wrangler.jsonc` 中的默认值仅用于本地开发（`http://localhost:8787`），CI 部署时会用上述 variables 覆盖。

#### First-time setup

```bash
# 1. 本地创建 D1 数据库，记下 database_id
npx wrangler d1 create zenglance-db
# Output: database_id = "<UUID>"

# 2. 推送仓库到 GitHub，然后在仓库 Settings → Secrets and variables → Actions 配置：
#    - Secrets：CLOUDFLARE_API_TOKEN / CLOUDFLARE_ACCOUNT_ID / D1_DATABASE_ID
#    - Secrets：B2_APPLICATION_KEY_ID / B2_APPLICATION_KEY
#    - Secrets：VALCORNER_CLIENT_ID / VALCORNER_CLIENT_SECRET
#    - Variables（可选）：D1_DATABASE_NAME / FRONTEND_URL / VALCORNER_REDIRECT_URI

# 3. 触发 workflow
#    GitHub → Actions → Deploy → Run workflow
```

> The `wrangler.jsonc` `database_id` is intentionally left as `YOUR_D1_DATABASE_ID` in the repo — the CI step **Inject D1 database_id** replaces it at build time using the `D1_DATABASE_ID` secret, so never commit a real ID.

## API Endpoints

### Authentication

- `GET /auth/login` - Redirect to Valcorner OAuth
- `GET /auth/callback` - OAuth callback handler, creates a D1 session and redirects to `${FRONTEND_URL}?session_id=...`
- `GET /auth/me` - Get current authenticated user (Bearer session_id)
- `POST /auth/logout` - Delete server-side session (client also clears local session_id)

### Upload

- `POST /api/upload/request` - Request presigned URL for B2 upload (Bearer session_id)
- `POST /api/upload/complete/:sessionId` - Mark upload as complete (Bearer session_id)

### Content

- `GET /api/content` - List ready contents, optional `?type=` filter
- `GET /api/content/:id` - Get content metadata + CDN access info

### Users

- `GET /api/users/:id` - Get public user profile
- `POST /api/admin/users/:id/role` - Upgrade user role (requires `official` role)

## Upload Flow

1. Client requests upload permission with content metadata
2. Workers validates role permissions and encryption requirements
3. Workers creates content record in D1 (status: pending)
4. Workers generates B2 presigned PUT URL via S3 SDK
5. Workers returns upload URL + session ID to client
6. Client encrypts file locally (if required) and uploads directly to B2
7. Client calls `/upload/complete` to finalize
8. Workers updates content status to "ready"

## Playback Flow

1. Client requests content metadata from `/api/content/:id`
2. Workers returns metadata + CDN URL template
3. Client calls `https://cdn.valcorner.qzz.io/api/token` to get ticket
4. Client constructs full CDN URL with ticket
5. Client plays content via HLS.js, DASH.js, or native AVPlayer

## License

MIT
