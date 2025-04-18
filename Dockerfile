# Stage 1: Build the app
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy dependencies manifest
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the app
COPY . .

# Build the app (outputs to /app/dist)
RUN npm run build

# Stage 2: Use Nginx to serve the app (optional, only if you need custom config)
FROM nginx:stable-alpine

# Remove default Nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy build output to Nginx’s html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port (Render will handle serving static content on port 80)
EXPOSE 80

# Start Nginx (although Render can handle this automatically)
CMD ["nginx", "-g", "daemon off;"]
