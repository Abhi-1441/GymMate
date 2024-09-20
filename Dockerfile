# Step 1: Build the React app
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Step 2: Serve the React app with Nginx
FROM nginx:alpine

# # Copy the build output from the previous step
COPY --from=build /app/dist /usr/share/nginx/html

# # Expose port 80
EXPOSE 80

# # Start Nginx
CMD ["nginx", "-g", "daemon off;"]
