# portfolio-adithya-tej-bm: plain static site served by nginx
FROM nginx:1.27-alpine
COPY docker/shared/nginx-static.conf /etc/nginx/conf.d/default.conf
COPY portfolio-adithya-tej-bm/frontend/ /usr/share/nginx/html/
# The page calls a hosted Azure App Service API; point it at the local /api (503) so the built-in static fallback content is always used.
RUN sed -i 's#https://adithya-portfolio-api[^"]*/api#/api#' /usr/share/nginx/html/script.js
