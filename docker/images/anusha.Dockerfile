# portfolio-anusha: single HTML file, served as index.html by nginx
FROM nginx:1.27-alpine
COPY docker/shared/nginx-static.conf /etc/nginx/conf.d/default.conf
COPY portfolio-anusha/anusha-portfolio.html /usr/share/nginx/html/index.html
