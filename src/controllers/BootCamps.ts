import express, { Request, Response } from 'express';

import IControllerBase from '../interfaces/IControllerBase.interface';
import asyncHandler from '../middlewares/async';
import BootcampModel from '../models/Bootcamp';
import ErrorResponse from '../utils/ErrorResponse';

class BootCampsController implements IControllerBase {
  public path = '/bootcamps';
  public router = express.Router();

  // @desc    Get all bootcamps
  // @route   GET /api1/v1/bootcamps
  // @access  Public
  public getBootCamps = asyncHandler(
    async (request: Request, response: Response) => {
      const bootcamps = await BootcampModel.find();
      response.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
      });
    }
  );

  // @desc    Get bootcamp by id
  // @route   GET /api1/v1/bootcamps/:id
  // @access  Public
  public getBootCamp = asyncHandler(
    async (request: Request, response: Response, next: any) => {
      const bootcamp = await BootcampModel.findById(request.params.id);
      if (!bootcamp) {
        return next(
          new ErrorResponse(
            `Bootcamp not fund with id of ${request.params.id}`,
            404
          )
        );
      }
      response.status(200).json({ success: true, data: bootcamp });
    }
  );

  // @desc    Create bootcamp
  // @route   Post /api1/v1/bootcamps
  // @access  Public
  public createBootCamp = asyncHandler(
    async (request: Request, response: Response) => {
      const newBootCamp = await BootcampModel.create(request.body);
      response.status(201).json({ success: true, data: newBootCamp });
    }
  );

  // @desc    Update bootcamp by id
  // @route   Post /api1/v1/bootcamps
  // @access  Public
  public updateBootCamp = asyncHandler(
    async (request: Request, response: Response, next: any) => {
      const bootcamp = await BootcampModel.findByIdAndUpdate(
        request.params.id,
        request.body,
        {
          new: true,
          runValidators: true
        }
      );
      if (!bootcamp) {
        return next(
          new ErrorResponse(
            `Bootcamp not fund with id of ${request.params.id}`,
            404
          )
        );
      }
      response.status(200).json({ status: true, data: bootcamp });
    }
  );

  public deleteBootcamp = asyncHandler(
    async (request: Request, response: Response, next: any) => {
      const bootcamp = await BootcampModel.findByIdAndDelete(request.params.id);
      if (!bootcamp) {
        return next(
          new ErrorResponse(
            `Bootcamp not fund with id of ${request.params.id}`,
            404
          )
        );
      }

      response.status(200).json({ status: true, data: {} });
    }
  );
  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get(`${this.path}`, this.getBootCamps);
    this.router.get(`${this.path}/:id`, this.getBootCamp);
    this.router.post(`${this.path}`, this.createBootCamp);
    this.router.put(`${this.path}/:id`, this.updateBootCamp);
    this.router.delete(`${this.path}/:id`, this.deleteBootcamp);
  }
}

export default BootCampsController;
