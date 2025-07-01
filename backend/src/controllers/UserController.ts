import { Request, Response, NextFunction } from 'express'
import { UserService } from '../services/UserService'
import { UserType } from '../Types/User'
import jwt from "jsonwebtoken"

interface AuthenticatedRequest extends Request {
  user?: UserType
}

const UserController = {
  async login(req: AuthenticatedRequest, res: Response, next: NextFunction) {
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
      console.log(error.message);
      next(error)
    }
  },

  async getCurrentUser(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?._id
      if (!userId) {
        res.status(404).json({
          message: "Invalid user"
        })
        return
      }

      const user = await UserService.getCurrentUser(userId)
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }
}

export default UserController
