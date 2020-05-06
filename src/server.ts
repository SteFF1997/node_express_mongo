import * as bodyParser from 'body-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';

import App from './app';
import { connectDB } from './config/db';

dotenv.config({ path: './config/config.env' });

connectDB();

import AppStateController from './controllers/AppState';
import BootCampsController from './controllers/BootCamps';
import errorHandler from './middlewares/error' ;
import loggerMiddleware from './middlewares/logger';

const app = new App({
  port: process.env.PORT || '5001',
  controllers: [new AppStateController(), new BootCampsController()],
  middleWares: [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    loggerMiddleware,
    errorHandler,
    morgan('dev')
  ]
});

app.app.use(loggerMiddleware);
app.app.use(errorHandler);

app.listen();

process.on('unhandledRejection', (err: any, promise: Promise<any>) => {
  console.log(`Error exit: ${err.message}`);
});
