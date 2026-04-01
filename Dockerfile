# Use nginx:alpine for a lightweight static site server
FROM nginx:alpine

# Copy site contents to the default nginx public directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# The default entrypoint for nginx:alpine stays the same
CMD ["nginx", "-g", "daemon off;"]
