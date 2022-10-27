FROM node:16-alpine As development
RUN npm set progress=false && npm config set depth 0

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build

RUN chmod +x -R scripts/

EXPOSE 6060

CMD [ "sh", "./scripts/dev.start.sh" ]

FROM node:16-alpine As release
RUN npm set progress=false && npm config set depth 0
ARG NODE_ENV=production
ENV NODE_ENV=production

WORKDIR /usr/app

COPY package*.json ./

RUN npm install --omit=dev

COPY *.json ./
COPY scripts/ ./scripts
RUN chmod +x -R scripts/

COPY --from=development /usr/app/dist ./dist

EXPOSE 6060

CMD [ "sh", "./scripts/prod.start.sh" ]
