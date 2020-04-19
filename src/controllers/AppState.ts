import express, { Request, Response } from 'express';

import IControllerBase from '../interfaces/IControllerBase.interface';

class AppStateController implements IControllerBase {
  public path = '/appstate/';
  public router = express.Router();
  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get(`${this.path}getUsers`, this.getHello);
  }

  public getHello = (request: Request, response: Response) => {
    console.warn('hello!');
    response.end();
  };
}

export default AppStateController;
