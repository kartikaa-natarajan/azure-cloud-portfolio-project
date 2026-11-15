# portfolio-rohit: the Express server only serves these static files, so nginx serves them directly
FROM nginx:1.27-alpine
COPY docker/shared/nginx-spa.conf /etc/nginx/conf.d/default.conf
COPY portfolio-rohit/index.html portfolio-rohit/style.css portfolio-rohit/script.js /usr/share/nginx/html/
COPY portfolio-rohit/images/ /usr/share/nginx/html/images/
