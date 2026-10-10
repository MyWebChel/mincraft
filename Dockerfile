# Сборка клиента
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Игровой сервер: отдаёт собранный клиент и держит WebSocket
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production PORT=3000 DATA_DIR=/data
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
COPY server ./server
COPY src/shared ./src/shared
VOLUME /data
EXPOSE 3000
CMD ["npm", "start"]
