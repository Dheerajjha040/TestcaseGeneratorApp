FROM node:20-bullseye

WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install deps (include dev deps so we don’t miss anything)
RUN npm install --silent

# Copy source code
COPY . .

EXPOSE 3000
CMD ["node", "src/index.js"]