import * as bodyParser from 'body-parser';
import dotenv from 'dotenv';

import App from './app';

dotenv.config({ path: './config/config.env' });

import AppStateController from './controllers/AppState';
import loggerMiddleware from './middlewares/logger';

const app = new App({
  port: process.env.PORT || '5000',
  controllers: [
    new AppStateController()
  ],
  middleWares: [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    loggerMiddleware
  ]
});

app.listen();
