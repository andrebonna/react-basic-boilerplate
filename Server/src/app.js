import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import order from './schemas/order';
import product from './schemas/product';
import supplier from './schemas/supplier';
import expressCRUD from 'express-generic-crud';
import config from '../config/config';

const app = express();

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mbStock');

expressCRUD.init(app);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/', express.static('View/public'));

app.crud('order', order);
app.crud('product', product);
app.crud('supplier', supplier);

app.listen(config.port);
