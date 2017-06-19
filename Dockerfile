FROM node:7

EXPOSE 3000
COPY . /warehouse-control
WORKDIR /warehouse-control

CMD ["npm", "start"]
