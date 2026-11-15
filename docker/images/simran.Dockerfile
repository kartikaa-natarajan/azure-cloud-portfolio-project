# portfolio-simran: plain static site served by nginx
FROM nginx:1.27-alpine
COPY docker/shared/nginx-spa.conf /etc/nginx/conf.d/default.conf
COPY portfolio-simran/public/ /usr/share/nginx/html/
