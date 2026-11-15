# portfolio-jeeva: plain static site served by nginx
FROM nginx:1.27-alpine
COPY docker/shared/nginx-static.conf /etc/nginx/conf.d/default.conf
COPY portfolio-jeeva/ /usr/share/nginx/html/
RUN rm -f /usr/share/nginx/html/staticwebapp.config.json   # Azure SWA-only config
