FROM nginx:alpine

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# The frontend build will be mounted as a volume
# No need to copy files here, docker-compose will handle it

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

