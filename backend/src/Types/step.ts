import { Types } from "mongoose"

export interface StepType {
  _id? : Types.ObjectId
  post_id: Types.ObjectId
  lng: number
  lat: number
  medias: Types.ObjectId[]
  description: string
  date_from: Date
  date_to: Date
  createdAt: Date
}