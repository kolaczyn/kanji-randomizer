FROM node:20-alpine AS build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
ENV VITE_API_BASE_URL=http://192.168.1.27:4000
RUN yarn build

FROM nginx:alpine AS runtime
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8082
