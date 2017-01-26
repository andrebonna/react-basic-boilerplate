import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import serveStatic from 'serve-static';
import order from './schemas/order';
import product from './schemas/product';
import supplier from './schemas/supplier';
import expressCRUD from 'express-generic-crud';
import config from '../config/config';

const app = express();

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/warehouseControl');

expressCRUD.init(app);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.crud('api/order', order);
app.crud('api/product', product);
app.crud('api/supplier', supplier);


app.use(serveStatic(path.resolve('View/public')), (req, res) => {
    res.sendFile(path.resolve('View/public/index.html'));
});

app.listen(config.port);
