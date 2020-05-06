import { Request, Response } from 'express';
import ErrorResponse from '../utils/ErrorResponse';

const errorHandler =  (err, req: Request, resp: Response) => {
	let error = { ...err };
	err.message = error.message;
	// log error to console
	console.log(err.stack.red);

	// Mongoose bad ObjectId
	if(err.name === 'CastError') {
		const message = `Resource not fund with id of ${err.value}`;
		error = new ErrorResponse(message, 404);
	}
	// Mongoose duplicate key
	if(err.code === 11000) {
		const message = 'Duplicate field value entered';
		error = new ErrorResponse(message, 400);
	}

	// Mongoose validation error
	if (err.name === 'ValidationError') {
		const message = Object.values(err.errors).map((val: any) => val.message);
		error = new ErrorResponse(message, 400);
	}

  resp.status(error.statusCode || 500).json({
	  success: false,
	  error: error.message || 'Server Error'
  })
};

export default errorHandler;
