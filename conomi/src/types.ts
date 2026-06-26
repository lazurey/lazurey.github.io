export type ScreenState = 'start' | 'playing' | 'levelComplete' | 'finished' | 'failed'

export type CardFace = {
  id: number
  image: string
}

export type GameCard = {
  id: string
  faceId: number
  image: string
  matched: boolean
}

export type LevelConfig = {
  label: string
  pairs: number
  time: number
  faces: CardFace[]
}
