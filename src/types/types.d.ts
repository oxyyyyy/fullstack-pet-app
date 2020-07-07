import { Request } from "express";
import { ValidationError } from "express-validator";

export interface BetterError extends Error {
  statusCode?: number;
  data?: ValidationError[];
}

export interface req extends Request {
  userID?: string;
}
