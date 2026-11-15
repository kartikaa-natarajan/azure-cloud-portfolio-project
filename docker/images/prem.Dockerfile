# portfolio-prem: plain static site served by nginx
FROM nginx:1.27-alpine
COPY docker/shared/nginx-static.conf /etc/nginx/conf.d/default.conf
COPY portfolio-prem/ /usr/share/nginx/html/
