import { Types } from "mongoose"

export type StepType = {
  _id? : Types.ObjectId
  post_id: Types.ObjectId
  lng: number
  lat: number
  medias: string[]
  description: string
  date_from: Date
  date_to: Date
  createdAt: Date
}