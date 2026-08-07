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
- **Auth**: Valcorner OAuth 2.0 PKCE + HS256 JWT session tokens
- **Validation**: Zod

## Project Structure

```
src/
├── index.js          # Main entry point, Hono app setup
├── db/
│   ├── index.js      # Database connection
│   └── schema.js     # Drizzle ORM schema (D1 tables) + relations
├── routes/
│   ├── auth.js       # OAuth login/callback, /me, logout, JWT issuance
│   └── upload.js     # Upload request/complete, content list & detail
├── services/
│   ├── b2.js         # Backblaze B2 S3 client, presigned URLs
│   └── valcorner.js  # Valcorner CDN URL builder
├── middleware/
│   └── auth.js       # JWT auth middleware + role guard
└── utils/
    ├── jwt.js        # HS256 JWT sign/verify (Web Crypto API)
    └── validators.js # Zod schemas, permission logic
migrations/
└── 0001_initial.sql  # D1 database schema
```

## Setup

### Prerequisites

1. Cloudflare account with Workers and D1 enabled
2. Backblaze B2 account with S3-compatible API credentials
3. Valcorner CDN account

### Environment Variables (Secrets)

```bash
wrangler secret put B2_ACCESS_KEY_ID
wrangler secret put B2_SECRET_ACCESS_KEY
wrangler secret put VALCORNER_CLIENT_ID
wrangler secret put VALCORNER_CLIENT_SECRET
wrangler secret put JWT_SECRET
```

### Configuration Vars (in `wrangler.jsonc`)

Non-secret runtime configuration, already set with local-dev defaults:

| Var | Purpose |
|-----|---------|
| `B2_ENDPOINT` | B2 S3 API endpoint |
| `B2_BUCKET_NAME` | B2 bucket name |
| `VALCORNER_REDIRECT_URI` | OAuth callback URL (`/auth/callback`) |
| `FRONTEND_URL` | Frontend origin for post-OAuth redirect with `?token=` |

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

```bash
npm run deploy
```

## API Endpoints

### Authentication

- `GET /auth/login` - Redirect to Valcorner OAuth
- `GET /auth/callback` - OAuth callback handler, issues JWT and redirects to `${FRONTEND_URL}?token=...`
- `GET /auth/me` - Get current authenticated user (Bearer JWT)
- `POST /auth/logout` - Logout (client discards local JWT)

### Upload

- `POST /api/upload/request` - Request presigned URL for B2 upload (Bearer JWT)
- `POST /api/upload/complete/:sessionId` - Mark upload as complete (Bearer JWT)

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
