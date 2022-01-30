FROM node

RUN npm install

COPY . .

EXPOSE 80

CMD ["npm", "start"]