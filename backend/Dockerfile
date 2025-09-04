FROM node:20-bullseye

WORKDIR /app

COPY package*.json ./

# Install build tools (needed for some native npm packages)
RUN apt-get update && apt-get install -y python3 g++ make \
    && rm -rf /var/lib/apt/lists/*

# Install deps (force legacy mode to avoid peer issues)
RUN npm install --legacy-peer-deps --silent

COPY . .

EXPOSE 3000
CMD ["node", "src/index.js"]