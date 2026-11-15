# portfolio-vinod: Next.js app run with `next start`
FROM node:22-alpine
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY portfolio-vinod/package*.json ./
RUN npm ci --legacy-peer-deps || npm install --legacy-peer-deps
COPY portfolio-vinod/ ./
RUN npm run build
ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0
EXPOSE 3000
CMD ["npm", "run", "start"]
