# portfolio-megha: Vite build, served by nginx as a single-page app
FROM node:22-alpine AS build
WORKDIR /app
COPY portfolio-megha/package*.json ./
RUN npm ci --legacy-peer-deps || npm install --legacy-peer-deps
COPY portfolio-megha/ ./
RUN npm run build

FROM nginx:1.27-alpine
COPY docker/shared/nginx-spa.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
