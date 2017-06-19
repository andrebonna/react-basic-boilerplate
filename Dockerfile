FROM node:7

EXPOSE 3000
WORKDIR /warehouse-control

CMD ["npm", "start"]
