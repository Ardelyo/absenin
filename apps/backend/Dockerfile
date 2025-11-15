FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/backend/package*.json ./apps/backend/

# Install dependencies
RUN npm install

# Copy app source
COPY apps/backend/ ./apps/backend/

# Build application
WORKDIR /app/apps/backend
RUN npm run build

# Expose port
EXPOSE 3001

# Start application
CMD ["npm", "run", "start"]
