FROM node:18-bookworm-slim

WORKDIR /app

# Install app deps
COPY package.json package-lock.json* ./
RUN npm install --production

# Copy source
COPY . .

# Default env (override in compose/.env)
ENV NODE_ENV=production

CMD ["npm", "run", "start"]


