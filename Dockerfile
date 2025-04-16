# Node.js image
FROM node:20

WORKDIR /app
COPY . .

# move into the Next.js app 
WORKDIR /app/qr-attendance-app

# install and build app
RUN npm install
RUN npm run build

ENV NODE_ENV production

EXPOSE 3000
# start the app
CMD ["npm", "start"]
