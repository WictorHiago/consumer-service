import { Request, Response, NextFunction } from "express";
import CustomException from "./CustomException";

function handlerError(
  error: Error & CustomException,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const statusCode = error.statusCode ?? 500;
  return response.status(statusCode).json({ message: error.message });
}

export default handlerError;
