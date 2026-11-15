# portfolio-abel-shon: plain static site served by nginx
FROM nginx:1.27-alpine
COPY docker/shared/nginx-static.conf /etc/nginx/conf.d/default.conf
COPY portfolio-abel-shon/ /usr/share/nginx/html/
