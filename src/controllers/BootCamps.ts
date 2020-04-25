import express, { Request, Response } from 'express';

import IControllerBase from '../interfaces/IControllerBase.interface';

class BootCampsController implements IControllerBase {
  public path = '/bootcamps';
  public router = express.Router();
  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get(`${this.path}`, this.getBootCamps);
    this.router.get(`${this.path}/:id`, this.getBootCamp);
    this.router.post(`${this.path}`, this.createBootCamp);
    this.router.put(`${this.path}/:id`, this.updateBootCamp);
  }

  public getBootCamps = (request: Request, response: Response) => {
    response.status(200).json({ message: 'getBootCamps' })
  };
   public getBootCamp = (request: Request, response: Response) => {
    response.status(200).json({ message: 'getBootCamp', id: request.params.id })
  };
  public createBootCamp = (request: Request, response: Response) => {
    response.status(200).json({ message: 'createBootCamp' })
  };
  public updateBootCamp = (request: Request, response: Response) => {
    response.status(200).json({ message: 'updateBootCamp', id: request.params.id })
  };


}

export default BootCampsController;
