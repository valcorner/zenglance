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
   - **Write**: Client → Backblaze B2 (native REST API upload URL)
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
- **Storage**: Backblaze B2 (native REST API, private bucket)
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
│   ├── b2.js         # Backblaze B2 native REST API client, upload URL generation
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
2. Inject `D1_DATABASE_ID` into `wrangler.jsonc` (replacing the `YOUR_D1_DATABASE_ID` placeholder; falls back to a dummy UUID when absent so tests still pass on PR branches)
3. Verify all required secrets are configured (only on `main`/`master` or manual dispatch)
4. `npm test -- --run` → run vitest
5. Inject all `wrangler.jsonc` vars from GitHub Secrets (e.g. `FRONTEND_URL`, `B2_BUCKET_NAME`, `VALCORNER_REDIRECT_URI`) — overrides defaults at build time
6. Inject real `D1_DATABASE_ID` into `wrangler.jsonc`
7. `wrangler d1 execute --remote --file=migrations/0001_initial.sql` → apply migrations (idempotent via `IF NOT EXISTS`)
8. `wrangler deploy` → deploy the Worker and upload all runtime secrets via `secrets: sync`

#### All GitHub Secrets（全部通过 Secrets 配置）

在 **Settings → Secrets and variables → Actions → New repository secret** 配置以下所有凭据和配置项：

| Secret | 值 | 来源 |
|--------|-----|------|
| `CLOUDFLARE_API_TOKEN` | `cff_xxxxxxxx` | Cloudflare → My Profile → API Tokens |
| `CLOUDFLARE_ACCOUNT_ID` | `xxxxxxxxxxxxxxxx` | Cloudflare Dashboard 右侧边栏 |
| `D1_DATABASE_ID` | `xxxxxxxx-xxxx-...` | `wrangler d1 create zenglance-db` 输出 |
| `D1_DATABASE_NAME` | `zenglance-db` | 与 wrangler.jsonc 保持一致 |
| `B2_APPLICATION_KEY_ID` | `BLAbc123...` | B2 Console → Account Keys |
| `B2_APPLICATION_KEY` | `BLAbc123...` | B2 Console → Account Keys（创建时显示） |
| `B2_API_URL` | `https://api.backblazeb2.com` | 通常无需修改 |
| `B2_BUCKET_NAME` | `zenglance-media` | 你的 B2 桶名 |
| `VALCORNER_CLIENT_ID` | `val_xxxxx` | Valcorner admin |
| `VALCORNER_CLIENT_SECRET` | `xxxxxx` | Valcorner admin |
| `VALCORNER_REDIRECT_URI` | `https://你的域名/auth/callback` | 生产环境回调地址 |
| `VALCORNER_SCOPE` | `openid email profile` | 通常无需修改 |
| `VALCORNER_AUTHORIZE_URL` | `https://auth.valcorner.qzz.io/oauth/authorize` | 通常无需修改 |
| `VALCORNER_TOKEN_URL` | `https://auth.valcorner.qzz.io/oauth/token` | 通常无需修改 |
| `VALCORNER_USERINFO_URL` | `https://auth.valcorner.qzz.io/oauth/userinfo` | 通常无需修改 |
| `FRONTEND_URL` | `https://你的域名` | 生产环境前端域名 |

> `wrangler.jsonc` 中的默认值仅用于本地开发。CI 部署时通过 **Inject wrangler.jsonc vars** 步骤将所有 GitHub secrets 注入替换，`secrets: sync` 将凭据上传到 Cloudflare Workers。

#### First-time setup

```bash
# 1. 本地创建 D1 数据库，记下 database_id
npx wrangler d1 create zenglance-db
# Output: database_id = "<UUID>"

# 2. 推送仓库到 GitHub，然后在仓库 Settings → Secrets and variables → Actions 配置以下所有 Secrets：

#    基础设施：
#      CLOUDFLARE_API_TOKEN、CLOUDFLARE_ACCOUNT_ID
#      D1_DATABASE_ID、D1_DATABASE_NAME
#
#    Backblaze B2：
#      B2_APPLICATION_KEY_ID、B2_APPLICATION_KEY
#      B2_API_URL、B2_BUCKET_NAME
#
#    Valcorner OAuth：
#      VALCORNER_CLIENT_ID、VALCORNER_CLIENT_SECRET
#      VALCORNER_REDIRECT_URI、VALCORNER_SCOPE
#      VALCORNER_AUTHORIZE_URL、VALCORNER_TOKEN_URL、VALCORNER_USERINFO_URL
#
#    应用配置：
#      FRONTEND_URL

# 3. 手动执行 D1 数据库迁移（只需执行一次）
npx wrangler d1 execute zenglance-db --remote --file=migrations/0001_initial.sql

# 4. 触发 workflow
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
4. Workers generates B2 upload URL + auth token via native REST API
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
