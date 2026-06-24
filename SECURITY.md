# SECURITY — sjprint frontend

This repo is **public** (required by GitHub Pages on the free tier — see the
backend's `decisions.md` #1). Everything you commit here is readable by anyone.
Use this checklist before opening a PR or pushing to `main`.

The backend repo (`sj-print-backend`) is private and holds all sensitive
logic. The trust boundary lives at the backend's HTTP API, not in this code.

---

## What lives where

| Concern | Frontend (this repo, public) | Backend (private) |
|---|---|---|
| Pricing display | Estimates from `GET /api/pricing` | Authoritative; `final_total` set by owner |
| Order intake | Form → `POST /api/orders` | Validates, stores, generates confirmation code |
| Payment | A link the customer follows | Square invoices, webhook, all credentials |
| Admin / dashboard | Nothing | Streamlit, Tailscale-gated (decision #6) |

If you find yourself wanting to do *backend* work here ("just hide this with
JS / put this constant in a file no one reads") — stop. Move it server-side.
Anyone can read this repo.

---

## Never commit

- **Secrets, tokens, API keys** of any kind. Frontend code is unauthenticated
  by design; the backend's rate limiting + idempotency + input validation is
  the gate. There is no client-side secret you legitimately need.
- **Vite gotcha**: any env var prefixed `VITE_` is **inlined into the public
  JS bundle** at build time. Treat `VITE_*` vars as public — never put a
  secret behind a `VITE_` name. Non-prefixed env vars are not exposed; use
  those for build-time tooling that must not leak.
- **The admin dashboard URL** — Tailscale address, SSH-tunnel host, or any
  path that hints where Streamlit lives. Decision #6 makes the network the
  gate; leaking the address weakens that even with the password fallback.
- **The Square webhook URL** — backend-only concern. Even though signature
  verification gates it, no reason to advertise it.
- **Internal pricing logic** — surcharge rules, owner judgment notes,
  cost-of-goods, margins. Frontend only *displays* numbers from `/api/pricing`.
- **Internal product names / test SKUs / draft variants.** The backend's
  `active=true` flag filters `/api/pricing`, but double-check anything you
  hardcode here.
- **Personal contact info** — owner's mobile, home address, personal email.
  Use a business-only address (e.g. the same one in `EMAIL_FROM`).
- **`.env` files with real values.** `.env*` should be gitignored; an
  `.env.example` with placeholder values is fine (and useful).
- **Source maps in production.** Vite ships them off by default; if you
  enable them, only do so for the dev build.
- **Customer data in fixtures / examples / screenshots.** Use fake names and
  fake emails. `jane.doe@example.com` is your friend.

---

## Always do

- Keep `.gitignore` covering `node_modules`, `dist`, `.env`, `.env.*`,
  `*.log`, `.DS_Store`. (Currently missing `.env*` — add it before any env
  work.)
- Run `gitleaks` as a pre-commit hook. The backend has it (commit
  `c85e857`); install the same hook here.
- Scrub HTML comments before commit. "TODO: hide this from customers" and
  "remember to bump price after Dec 1" are real leaks.
- Surface errors generically. Show "Something went wrong, please try again"
  to the user; let the backend log the real reason.
- Treat the catalog as the only data source. Don't reconstruct prices from
  hardcoded constants — fetch from `/api/pricing` so price changes propagate.

---

## PR checklist (paste into PR description)

- [ ] No `VITE_*` env var contains a secret
- [ ] No admin URLs, internal endpoints, or Tailscale addresses in the diff
- [ ] No hardcoded prices (only display values from `/api/pricing`)
- [ ] No real customer data in fixtures / examples / screenshots
- [ ] No new files outside the public surface (`.env`, `.local`, etc. ignored)
- [ ] `gitleaks` pre-commit hook ran clean

---

## Reporting

If you find a secret leak in this repo's history, the fix is to **rotate the
key** (not just remove it from the commit) — git history is forever once
pushed. See backend `decisions.md` #2 for the rotation posture.

Other vulnerabilities: open a private GitHub Security Advisory on this repo
or email the owner directly.
