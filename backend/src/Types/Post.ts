export type PostType = {
  _id? : string
  owner_id: string
  description: string
  medias: string[]
  steps: string[]
  tags: string[]
  status: "private" | "public" | "draft"
  createdAt: Date
}