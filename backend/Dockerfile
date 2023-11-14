FROM node:18 AS development

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

WORKDIR /app

ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT 9229

COPY ["package.json", "package-lock.json*", "./"]

COPY prisma ./prisma/

COPY .env ./

COPY tsconfig.json ./

RUN npm ci
RUN npx prisma generate


COPY . .

RUN npm run build

CMD [ "node", "dist/index.js" ]