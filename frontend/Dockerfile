FROM node:16.15.0 as build-stage
WORKDIR /var/jenkins_home/workspace/frontend/frontend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /var/jenkins_home/workspace/frontend/frontend/dist /usr/share/nginx/html

# Nginx 설정 (Nginx 설정 전에는 주석처리해두어야 에러가 나지 않음)
COPY --from=build-stage /var/jenkins_home/workspace/frontend/frontend/deploy_conf/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g","daemon off;"]
