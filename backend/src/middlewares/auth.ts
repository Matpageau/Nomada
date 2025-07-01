import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload
}

export function verifyToken(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const token = req.headers["authorization"]?.split(" ")[1]

  if(!token) {
    res.status(401).json({
      error: "Token required"
    })
    return
  }

  const jwtSecret: Secret = process.env.JWT_SECRET!

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if(err || !decoded) {
      return res.status(403).json({ error: "Invalid token"})
    }

    req.user = decoded

    next()
  })
}