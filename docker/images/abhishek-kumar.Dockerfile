# portfolio-abhishek-kumar: plain static site served by nginx
FROM nginx:1.27-alpine
COPY docker/shared/nginx-static.conf /etc/nginx/conf.d/default.conf
COPY portfolio-abhishek-kumar/ /usr/share/nginx/html/
RUN rm -f /usr/share/nginx/html/web.config   # IIS/Azure-only config
