import e, { NextFunction, Request, Response } from 'express'
import jwt from "jsonwebtoken"
import { UserService } from '../services/UserService'
import ApiError from '../Utils/ApiError'

const UserController = {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body

      const user = await UserService.login(username, password)
      
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
      )

      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
      })

      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  },

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, username } = req.body
  
      if (!email || !password || !username ) {
        throw new ApiError(400, "ALL_FIELDS_REQUIRED", "All fields of signup are required")
      }

      const user = await UserService.register(email, password, username)
      res.status(201).json(user)
      
    } catch (error) {
      next(error)
    }
  },

  async getCurrentUser(req: any, res: Response) {
    try {
      const userId = req.userId
      
      if (!userId) {
        res.status(404).json({
          message: "Invalid user"
        })
        return
      }

      const user = await UserService.getCurrentUser(userId)
      res.status(200).json(user)
    } catch (error: any) {
      console.error(error.message)
      res.status(401).json({ message: error.message })
    }
  },

  async getByUsername(req: any, res: Response) {
    try {
      const username = req.params.username
      
      if (!username) {
        res.status(404).json({
          message: "Invalid user"
        })
        return
      }

      const user = await UserService.getUserByUsername(username)
      res.status(200).json(user)
    } catch (error: any) {
      console.error(error.message)
      res.status(401).json({ message: error.message })
    }
  }
}

export default UserController
