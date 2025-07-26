export interface StepType {
  _id? : string
  post_id: string
  country_id: string
  lng: number
  lat: number
  medias: string[]
  description: string
  date_from: Date
  date_to: Date
  createdAt: Date
}