# Stage 1: Build the Angular app
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code (ไม่คัดลอกโฟลเดอร์ mock)
COPY . .

# Remove the mock folder
RUN rm -rf ./mock

# Build the Angular app
RUN npm run build --prod

# Stage 2: Serve the Angular app using NGINX
FROM nginx:alpine

# Copy the built Angular files from the previous stage
COPY --from=build /app/dist/budget-client/browser/* /usr/share/nginx/html/

# Expose port 4200
EXPOSE 4200

# Configure NGINX to serve on port 4200
RUN sed -i 's/listen       80;/listen 4200;/g' /etc/nginx/conf.d/default.conf

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
