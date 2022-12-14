import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { store } from './controllers/CategoryControllers.js'

import indexRouter from './routes/index.js';

const env = dotenv.config().parsed;
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.post('/categories', store);

//connect to mongodb
mongoose.connect(`${env.MONGODB_URI}${env.MONGODB_HOST}:${env.MONGODB_PORT}`, {
	dbName: env.MONGODB_DB_NAME
})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection-error:'));
db.once('open', function() {
	console.log('Connected to MongoDB');
});

app.listen(env.APP_PORT, () => {
	console.log(`Server is running on ${env.APP_PORT}`)
})
