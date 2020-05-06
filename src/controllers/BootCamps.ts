import express, { Request, Response } from 'express';

import IControllerBase from '../interfaces/IControllerBase.interface';
import BootcampModel from '../models/Bootcamp';

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

  // @desc    Get all bootcamps
  // @route   GET /api1/v1/bootcamps
  // @access  Public
  public getBootCamps = async (request: Request, response: Response) => {
    try {
      const bootcamps = await BootcampModel.find();
      response.status(200).json({ success: true, data: bootcamps });
    } catch (e) {
      response.status(400).json({ success: false });
    }
  };

  // @desc    Get bootcamp by id
  // @route   GET /api1/v1/bootcamps/:id
  // @access  Public
  public getBootCamp = async (request: Request, response: Response) => {
    try {
      const bootcamp = await BootcampModel.findById(request.params.id);
      if (!bootcamp) {
        response.status(404).json({ success: false });
      }
      response.status(200).json({ success: true, data: bootcamp });
    } catch (e) {
      response.status(400).json({ success: false });
    }
  };

  // @desc    Create bootcamp
  // @route   Post /api1/v1/bootcamps
  // @access  Public
  public createBootCamp = async (request: Request, response: Response) => {
    try {
      const newBootCamp = await BootcampModel.create(request.body);
      response.status(201).json({ success: true, data: newBootCamp });
    } catch (e) {
      response.status(400).json({ success: false });
    }
  };

  // @desc    Update bootcamp by id
  // @route   Post /api1/v1/bootcamps
  // @access  Public
  public updateBootCamp = (request: Request, response: Response) => {
    response
      .status(200)
      .json({ message: 'updateBootCamp', id: request.params.id });
  };
}

export default BootCampsController;
