FROM nginx:1.23.2-alpine
LABEL org.opencontainers.image.source https://github.com/TArch64/eks-todo-app

WORKDIR /app

COPY ./app/frontend ./app/frontend
COPY ./ci/config.nginx /etc/nginx/templates/default.conf.template
