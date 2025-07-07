import { Types } from "mongoose"

export type MediaType = {
  _id?: Types.ObjectId
  type: "photo" | "video"
  url: string
  owner_id: Types.ObjectId
}