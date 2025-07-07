import type { MediaType } from "./Media"
import type { StepType } from "./step"

export type PopulatedStep = Omit<StepType, 'medias'> & {
  medias: MediaType[]
}