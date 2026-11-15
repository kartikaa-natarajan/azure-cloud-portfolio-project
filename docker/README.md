# Portfolio containers

One image per student portfolio, all run on a single VM behind one nginx reverse proxy.

```
docker/
  docker-compose.yml     all services + the proxy
  images/<name>.Dockerfile   one Dockerfile per portfolio (build context = repo root)
  shared/                nginx configs reused by the static/SPA images
  proxy/                 reverse proxy (nginx.conf) + landing page (index.html)
```

## Run

```sh
docker compose -f docker/docker-compose.yml up -d --build
```

Open `http://localhost:8080/` for the landing page (list of every portfolio). Change the port with
`PORTFOLIO_HTTP_PORT=80`.

## URLs

Each portfolio gets its own subdomain: `http://<name>.<host>:<port>/`.

| Where you run it | Example |
|---|---|
| Your laptop | `http://devyansh.localhost:8080/` (`*.localhost` resolves to 127.0.0.1 in browsers, no setup) |
| VM with a domain | add a wildcard DNS record `*.example.com -> <VM IP>`, then `http://devyansh.example.com/` |
| VM with only an IP | `http://devyansh.<VM-IP>.nip.io/` (nip.io resolves it back to the IP, no DNS needed) |

Why subdomains and not `/devyansh/` paths: most of these sites use absolute asset paths (`/assets/app.js`)
and would break under a sub-path.

The proxy only forwards names listed in `proxy/nginx.conf`; everything else is a 404.

## Adding or fixing a portfolio

1. Add `docker/images/<name>.Dockerfile` (copy the closest existing one).
2. Add a `p-<name>` service in `docker-compose.yml` and a line in the `map` in `proxy/nginx.conf`.
3. Add the name to `SITES` in `proxy/index.html`.

## Decisions

- **Backends are not run.** Contact forms, chatbots and APIs need secrets, databases or Azure services, and the sites
  display without them. Static images answer `/api/*` with a JSON 503, so forms fail with a normal error instead of a
  broken page.
- **Azure-only files are removed** in the image (`staticwebapp.config.json`, `web.config`, Azure Functions `api/`).
  `portfolio-adithya-tej-bm` called a hosted Azure App Service; its image repoints that to `/api`, so the page's own
  built-in fallback content is always shown.
- **govind-madhav** needs PostgreSQL to render. Compose starts a private `postgres` container plus a one-shot
  `migrate` job that creates the tables and seeds the content. Set `GOVIND_AUTH_SECRET` for anything beyond a demo.
- **Skipped:** `portfolio-Surya`, `portfolio-Sourav` (by request).
- The existing `Dockerfile`s inside `portfolio-govind-madhav/` and `portfolio-utkarsh/` are left untouched and unused.
