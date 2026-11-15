# portfolio-devyansh: plain static site served by nginx
FROM nginx:1.27-alpine
COPY docker/shared/nginx-static.conf /etc/nginx/conf.d/default.conf
COPY portfolio-devyansh/ /usr/share/nginx/html/
# Azure Static Web Apps pieces are not used: drop the Functions API and SWA config (contact form falls back to formsubmit.co in the page itself).
RUN rm -rf /usr/share/nginx/html/api /usr/share/nginx/html/staticwebapp.config.json
