import jwt from "jsonwebtoken";

import { BetterError } from "../types/types";

export default (req: any, res: any, next: any) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error: BetterError = new Error("No auth header");
    error.statusCode = 401;
    throw error;
  }

  const jwtToken = authHeader.split(" ")[1];
  let decodedJwtToken: any;

  try {
    decodedJwtToken = jwt.verify(jwtToken, process.env.JWT_SECRET!);
    console.log("JWT", decodedJwtToken);
  } catch (error) {
    res.status(401).json(error);
    throw error;
  }

  if (!decodedJwtToken) {
    const error: BetterError = new Error("Not authenticated");
    error.statusCode = 401;
    throw error;
  }

  req.userID = decodedJwtToken.id;
  next();
};
