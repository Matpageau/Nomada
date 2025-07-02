import jwt, { Secret } from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

export function verifyToken(req: any, res: Response, next: NextFunction): void {
  const token = req.cookies.token
  
  if(!token) {
    res.status(401).json({
      error: "Token required"
    })
    return
  }

  const jwtSecret: Secret = process.env.JWT_SECRET!

  jwt.verify(token, jwtSecret, (err: any, decoded: any) => {
    if(err || !decoded) {
      return res.status(403).json({ error: "Invalid token"})
    }
    console.log(decoded);
    
    req.userId = decoded.userId

    next()
  })
}