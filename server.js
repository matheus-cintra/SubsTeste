require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

const subscriberRouter = require('./routes/subscribers');


mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (err) => console.error(err));
db.once('open', () => console.log('Conectado ao Mongo'));

app.use(express.json());

app.use('/subscribers', subscriberRouter);

app.listen(4000, () => console.warn('Rodando backend na porta 4000'));