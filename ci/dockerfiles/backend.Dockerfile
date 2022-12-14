FROM node:18.12-alpine
LABEL org.opencontainers.image.source https://github.com/TArch64/eks-todo-app

WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm ci --omit=dev

COPY ./app/backend ./app/backend

CMD ["node", "app/backend/server"]
