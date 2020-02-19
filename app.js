/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const centralerrors = require('./middlewares/centralerrors');
const routes = require('./routes/index');

const {
  PORT = 3000,
  RATE_LIMIT_MINUTES = 15,
  RATE_LIMIT_QTY = 200,
  MONGO_DB = 'mongodb://localhost:27017/news-tracker',
} = process.env;

const limiter = rateLimit({
  windowMs: RATE_LIMIT_MINUTES * 60 * 1000,
  max: RATE_LIMIT_QTY,
});

const app = express();
app.set('trust proxy', 1);
app.use(cors(({
  credentials: true,
  origin: true,
})));
app.use(limiter);
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

mongoose.connect(MONGO_DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(centralerrors);

app.listen(PORT, () => {
  console.log('App is listening to port ', PORT);
});
