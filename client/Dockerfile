 # Этап 1: Сборка фронтенда
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
ARG VITE_DOMAIN_NAME
ARG VITE_PROTOCOL
ARG VITE_KEYCLOAK_URL
ARG VITE_KEYCLOAK_CLIENT_ID
ARG VITE_KEYCLOAK_REALM

ENV VITE_DOMAIN_NAME=$VITE_DOMAIN_NAME
ENV VITE_PROTOCOL=$VITE_PROTOCOL
ENV VITE_KEYCLOAK_URL=$VITE_KEYCLOAK_URL
ENV VITE_KEYCLOAK_CLIENT_ID=$VITE_KEYCLOAK_CLIENT_ID
ENV VITE_KEYCLOAK_REALM=$VITE_KEYCLOAK_REALM
COPY . .
RUN npm run build

# Этап 2: Раздача через Nginx
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]