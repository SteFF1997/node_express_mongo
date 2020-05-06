import express, { Request, Response } from 'express';

import IControllerBase from '../interfaces/IControllerBase.interface';
import errorHandler from '../middlewares/error';
import BootcampModel from '../models/Bootcamp';
import ErrorResponse from '../utils/ErrorResponse';

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
    this.router.delete(`${this.path}/:id`, this.deleteBootcamp);
  }

  // @desc    Get all bootcamps
  // @route   GET /api1/v1/bootcamps
  // @access  Public
  public getBootCamps = async (request: Request, response: Response) => {
    try {
      const bootcamps = await BootcampModel.find();
      response.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
      });
    } catch (e) {
      errorHandler(e, request, response);
    }
  };

  // @desc    Get bootcamp by id
  // @route   GET /api1/v1/bootcamps/:id
  // @access  Public
  public getBootCamp = async (
    request: Request,
    response: Response,
  ) => {
    try {
      const bootcamp = await BootcampModel.findById(request.params.id);
      if (!bootcamp) {
        return errorHandler(
          new ErrorResponse(
            `Bootcamp not fund with id of ${request.params.id}`,
            404
          ),
          request,
          response
        );
      }
      response.status(200).json({ success: true, data: bootcamp });
    } catch (e) {
      // response.status(400).json({ success: false });
      errorHandler(e, request, response);
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
      errorHandler(e, request, response);
    }
  };

  // @desc    Update bootcamp by id
  // @route   Post /api1/v1/bootcamps
  // @access  Public
  public updateBootCamp = async (request: Request, response: Response) => {
    try {
      const bootcamp = await BootcampModel.findByIdAndUpdate(
        request.params.id,
        request.body,
        {
          new: true,
          runValidators: true
        }
      );
      if (!bootcamp) {
        return errorHandler(
          new ErrorResponse(
            `Bootcamp not fund with id of ${request.params.id}`,
            404
          ),
          request,
          response
        );
      }

      response.status(200).json({ status: true, data: bootcamp });
    } catch (e) {
      errorHandler(e, request, response);
    }
  };

  public deleteBootcamp = async (request: Request, response: Response) => {
    try {
      const bootcamp = await BootcampModel.findByIdAndDelete(request.params.id);
      if (!bootcamp) {
        return errorHandler(
          new ErrorResponse(
            `Bootcamp not fund with id of ${request.params.id}`,
            404
          ),
          request,
          response
        );
      }

      response.status(200).json({ status: true, data: {} });
    } catch (e) {
      errorHandler(e, request, response);
    }
  };
}

export default BootCampsController;
