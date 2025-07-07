import { Types } from "mongoose"

export type PostType = {
  _id? : Types.ObjectId
  owner_id: Types.ObjectId
  description: string
  medias: Types.ObjectId[]
  steps: Types.ObjectId[]
  tags: string[]
  status: "private" | "public" | "draft"
  createdAt: Date
}