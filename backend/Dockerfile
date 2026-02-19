FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build TypeScript to JavaScript
RUN npm run build

# Render provides the PORT environment variable, defaults to 10000
EXPOSE 10000

# Use production start script with auto-migration
CMD ["npm", "run", "render-start"]
