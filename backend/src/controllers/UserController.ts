import { Request, Response, NextFunction } from 'express'
import { UserType } from '../Types/User'
import jwt from "jsonwebtoken"
import { UserService } from '../services/UserService'

const UserController = {
  async login(req: Request, res: Response) {
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
    } catch (error: any) {
      res.status(401).json({ message: error.message })
    }
  },

  async register(req: Request, res: Response) {
    try {
      const { email, password, username, fullName } = req.body
  
      if (!email || !password || !username || !fullName) {
        res.status(400).json({ message: "All fields are required" })
        return
      }

      const user = await UserService.register(email, password, username, fullName)
      res.status(201).json(user)
      
    } catch (error: any) {
      console.error('❌ Register error:', error.message)
      res.status(500).json({ message: error.message })
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
