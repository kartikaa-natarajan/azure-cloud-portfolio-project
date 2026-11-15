# portfolio-hemanth-raj: npm workspace; only the Vite client is built and served (the Express/Mongo server is not run)
FROM node:22-alpine AS build
WORKDIR /app
COPY portfolio-hemanth-raj/ ./
RUN npm ci --legacy-peer-deps || npm install --legacy-peer-deps
RUN npm run build --workspace client

FROM nginx:1.27-alpine
COPY docker/shared/nginx-spa.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/client/dist /usr/share/nginx/html
