import { NextFunction, Request, Response } from "express"

export default function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction): any {
  res.status(err.status || 500).json({
    code: err.code || "INTERNAL_SERVER_ERROR",
    message: err.message || "Something went wrong"
  })
}