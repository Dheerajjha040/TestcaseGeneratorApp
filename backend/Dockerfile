FROM node:18-bullseye

WORKDIR /app

COPY package*.json ./

RUN apt-get update && apt-get install -y python3 g++ make \
    && rm -rf /var/lib/apt/lists/*

# Force install, skip optional native modules
RUN npm install --force --no-optional

COPY . .

EXPOSE 3000
CMD ["node", "src/index.js"]