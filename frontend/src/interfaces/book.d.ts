import { type Section } from './section'

export interface Book {
  name: string
  description: string
  image: string
  sections: Section[]
  userId: number
  collaborators: number[]
  id: number
}
