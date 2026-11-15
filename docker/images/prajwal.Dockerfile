# portfolio-prajwal: plain static site served by nginx
FROM nginx:1.27-alpine
COPY docker/shared/nginx-static.conf /etc/nginx/conf.d/default.conf
COPY portfolio-prajwal/ /usr/share/nginx/html/
RUN rm -rf /usr/share/nginx/html/api   # Azure Functions backend is not used
