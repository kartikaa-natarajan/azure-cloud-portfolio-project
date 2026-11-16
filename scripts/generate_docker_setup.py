#!/usr/bin/env python3
"""
Automated Docker & Proxy Provisioning Script for Azure Cloud Portfolio Project.

Scans the repository for portfolio directories, detects their tech stack,
generates Dockerfile + .dockerignore (if missing), and syncs them into
proxy/nginx.conf, proxy/index.html, and docker-compose.yml.
"""

import os
import sys
import json
import re
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent

EXCLUDE_DIRS = {
    ".git", ".github", "node_modules", "proxy", "scripts", "temp-sakshi", "temp_clone"
}

STACK_TEMPLATES = {
    "vite": {
        "dockerfile": """# Stage 1: Build the Vite application
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps || npm install --legacy-peer-deps

COPY . .
RUN npm run build

# Stage 2: Serve using Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
""",
        "dockerignore": "node_modules\ndist\n.git\n.github\n*.log\n",
        "port": 80,
        "badge": "Vite / React"
    },
    "static": {
        "dockerfile": """FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
""",
        "dockerignore": ".git\n.github\nDockerfile\n.dockerignore\n*.md\n",
        "port": 80,
        "badge": "Static HTML"
    },
    "python_flask": {
        "dockerfile": """FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
""",
        "dockerignore": "__pycache__\n*.pyc\n.git\n.github\nDockerfile\n.dockerignore\n*.md\n",
        "port": 5000,
        "badge": "Python / Flask"
    },
    "node_express": {
        "dockerfile": """FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev || npm install --omit=dev

COPY . .

ENV PORT=8080
EXPOSE 8080
CMD ["node", "server.js"]
""",
        "dockerignore": "node_modules\n.git\n.github\nDockerfile\n.dockerignore\n*.log\n",
        "port": 8080,
        "badge": "Express.js"
    },
    "nextjs_export": {
        "dockerfile": """# Stage 1: Build Next.js static export
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps || npm install --legacy-peer-deps

COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=builder /app/out /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
""",
        "dockerignore": "node_modules\n.next\nout\n.git\n.github\nDockerfile\n.dockerignore\n*.log\n",
        "port": 80,
        "badge": "Next.js"
    },
    "nextjs_server": {
        "dockerfile": """# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps || npm install --legacy-peer-deps

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
""",
        "dockerignore": "node_modules\n.next\n.git\n.github\nDockerfile\n.dockerignore\n*.log\n",
        "port": 3000,
        "badge": "Next.js"
    }
}


def detect_stack(dir_path: Path):
    pkg_file = dir_path / "package.json"
    req_file = dir_path / "requirements.txt"
    app_file = dir_path / "app.py"

    if pkg_file.exists():
        try:
            with open(pkg_file, "r", encoding="utf-8") as f:
                pkg_data = json.load(f)
            deps = {**pkg_data.get("dependencies", {}), **pkg_data.get("devDependencies", {})}
            scripts = pkg_data.get("scripts", {})

            if "next" in deps:
                # Check for output: 'export' in next.config
                for conf in dir_path.glob("next.config.*"):
                    content = conf.read_text(encoding="utf-8")
                    if "output: 'export'" in content or 'output: "export"' in content:
                        return "nextjs_export"
                return "nextjs_server"

            if "vite" in deps or "@vitejs/plugin-react" in deps:
                return "vite"

            if "express" in deps or "server.js" in os.listdir(dir_path):
                return "node_express"

            if "react-scripts" in deps:
                return "vite"  # CRA builds to static build/ folder

        except Exception as e:
            print(f"Warning: could not parse package.json in {dir_path.name}: {e}")

    if req_file.exists() or app_file.exists():
        return "python_flask"

    return "static"


def extract_slug_and_name(dir_name: str):
    clean = dir_name
    if clean.startswith("portfolio-"):
        clean = clean[len("portfolio-"):]
    elif clean.endswith("-portfolio"):
        clean = clean[:-len("-portfolio")]

    slug = re.sub(r"[^a-z0-9-]", "", clean.lower())
    # Format human readable name from slug / folder name
    parts = re.split(r"[-_]", clean)
    display_name = " ".join(p.capitalize() for p in parts if p)
    return slug, display_name


def scan_portfolios():
    portfolios = []
    for item in sorted(REPO_ROOT.iterdir()):
        if not item.is_dir():
            continue
        if item.name in EXCLUDE_DIRS or item.name.startswith("."):
            continue

        # Check if it looks like a portfolio
        has_web_files = (
            item.name.startswith("portfolio-") or
            item.name.endswith("-portfolio") or
            (item / "index.html").exists() or
            (item / "package.json").exists() or
            (item / "requirements.txt").exists()
        )
        if not has_web_files:
            continue

        stack = detect_stack(item)
        slug, name = extract_slug_and_name(item.name)
        portfolios.append({
            "dir": item.name,
            "path": item,
            "slug": slug,
            "name": name,
            "stack": stack
        })
    return portfolios


def sync_dockerfiles(portfolios, overwrite=False):
    created = 0
    for p in portfolios:
        dockerfile = p["path"] / "Dockerfile"
        dockerignore = p["path"] / ".dockerignore"
        tmpl = STACK_TEMPLATES[p["stack"]]

        if not dockerfile.exists() or overwrite:
            dockerfile.write_text(tmpl["dockerfile"], encoding="utf-8")
            created += 1
            print(f"  [+] Created {p['dir']}/Dockerfile ({tmpl['badge']})")

        if not dockerignore.exists() or overwrite:
            dockerignore.write_text(tmpl["dockerignore"], encoding="utf-8")

    return created


def sync_proxy_nginx(portfolios):
    nginx_conf_path = REPO_ROOT / "proxy" / "nginx.conf"
    if not nginx_conf_path.exists():
        return

    content = nginx_conf_path.read_text(encoding="utf-8")
    map_match = re.search(r"(map\s+\$site\s+\$upstream\s*\{)(.*?)(\})", content, re.DOTALL)
    if not map_match:
        return

    header, body, footer = map_match.groups()
    lines = [line.strip() for line in body.strip().splitlines() if line.strip()]

    existing = {}
    for line in lines:
        parts = line.split()
        if len(parts) >= 2:
            existing[parts[0]] = line

    added = 0
    for p in portfolios:
        slug = p["slug"]
        tmpl = STACK_TEMPLATES[p["stack"]]
        port = tmpl["port"]
        container_name = f"portfolio-{slug}"
        entry = f"{slug:<20} {container_name}:{port};"

        if slug not in existing and slug != "default":
            existing[slug] = f"    {entry}"
            added += 1

    # Reconstruct sorted map body
    default_line = "    default              \"\";"
    sorted_entries = [default_line] + [
        existing[k] for k in sorted(existing.keys()) if k != "default"
    ]
    new_body = "\n" + "\n".join(sorted_entries) + "\n"
    new_content = content[:map_match.start(2)] + new_body + content[map_match.end(2):]

    nginx_conf_path.write_text(new_content, encoding="utf-8")
    if added > 0:
        print(f"  [+] Added {added} upstream routing entries to proxy/nginx.conf")


def sync_proxy_html(portfolios):
    html_path = REPO_ROOT / "proxy" / "index.html"
    if not html_path.exists():
        return

    content = html_path.read_text(encoding="utf-8")
    match = re.search(r"const\s+SITES\s*=\s*\[(.*?)\];", content, re.DOTALL)
    if not match:
        return

    sites_json_str = f"[{match.group(1)}]"
    try:
        sites_list = json.loads(sites_json_str)
    except Exception:
        # Fallback eval / regex extraction
        raw_entries = re.findall(r'\[\s*"([^"]+)"\s*,\s*"([^"]+)"\s*,\s*"([^"]+)"\s*\]', match.group(1))
        sites_list = [[r[0], r[1], r[2]] for r in raw_entries]

    existing_slugs = {s[0] for s in sites_list}
    added = 0
    for p in portfolios:
        if p["slug"] not in existing_slugs:
            tmpl = STACK_TEMPLATES[p["stack"]]
            sites_list.append([p["slug"], p["name"], tmpl["badge"]])
            existing_slugs.add(p["slug"])
            added += 1

    # Sort alphabetically by name
    sites_list.sort(key=lambda s: s[1].lower())
    formatted = ",\n  ".join(json.dumps(s) for s in sites_list)
    new_sites = f"const SITES = [\n  {formatted}\n];"

    new_content = content[:match.start()] + new_sites + content[match.end():]
    html_path.write_text(new_content, encoding="utf-8")
    if added > 0:
        print(f"  [+] Added {added} portfolios to proxy/index.html dashboard")


def main():
    print(f"\n🔍 Scanning repository for student portfolios at: {REPO_ROOT}\n")
    portfolios = scan_portfolios()
    print(f"Found {len(portfolios)} portfolio directories.\n")

    print("🛠️  Syncing Dockerfiles...")
    created_df = sync_dockerfiles(portfolios, overwrite=False)
    if created_df == 0:
        print("  All portfolios already have valid Dockerfiles.")

    print("\n🌐 Syncing Reverse Proxy Nginx configuration...")
    sync_proxy_nginx(portfolios)

    print("\n🖥️  Syncing Portfolio Hub Landing Dashboard...")
    sync_proxy_html(portfolios)

    print("\n✅ Automation complete! All portfolios are synced with Docker & Proxy.\n")


if __name__ == "__main__":
    main()
