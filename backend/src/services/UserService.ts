import { UserRepository } from "../repositories/UserRepository"

export const UserService = {
  async login(username: string, password: string) {
    return await UserRepository.login(username, password)
  },

  async getCurrentUser(id: string) {
    const user = await UserRepository.findById(id)
    if(!user) throw new Error("User not found")
    return user
  }
}