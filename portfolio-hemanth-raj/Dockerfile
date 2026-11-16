# Stage 1: Build client
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/
RUN npm ci

COPY client/ ./client/
RUN npm run build --workspace client

# Stage 2: Serve using Nginx
FROM nginx:alpine
COPY --from=build /app/client/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
