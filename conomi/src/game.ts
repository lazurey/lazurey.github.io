import card1 from './assets/card-1.png'
import card2 from './assets/card-2.png'
import card3 from './assets/card-3.png'
import card4 from './assets/card-4.png'
import card5 from './assets/card-5.png'
import card6 from './assets/card-6.png'
import card7 from './assets/card-7.png'
import card8 from './assets/card-8.png'
import card9 from './assets/card-9.png'
import card10 from './assets/card-10.png'
import type { GameCard, LevelConfig } from './types'

export const levels: LevelConfig[] = [
  {
    label: '关卡 1',
    pairs: 3,
    time: 10,
    faces: [
      { id: 1, image: card1 },
      { id: 2, image: card2 },
      { id: 3, image: card3 },
    ],
  },
  {
    label: '关卡 2',
    pairs: 6,
    time: 15,
    faces: [
      { id: 1, image: card1 },
      { id: 2, image: card2 },
      { id: 3, image: card3 },
      { id: 4, image: card4 },
      { id: 5, image: card5 },
      { id: 6, image: card6 },
    ],
  },
  {
    label: '关卡 3',
    pairs: 8,
    time: 20,
    faces: [
      { id: 1, image: card1 },
      { id: 2, image: card2 },
      { id: 3, image: card3 },
      { id: 4, image: card4 },
      { id: 5, image: card5 },
      { id: 6, image: card6 },
      { id: 7, image: card7 },
      { id: 8, image: card8 },
    ],
  },
  {
    label: '关卡 4',
    pairs: 10,
    time: 30,
    faces: [
      { id: 1, image: card1 },
      { id: 2, image: card2 },
      { id: 3, image: card3 },
      { id: 4, image: card4 },
      { id: 5, image: card5 },
      { id: 6, image: card6 },
      { id: 7, image: card7 },
      { id: 8, image: card8 },
      { id: 9, image: card9 },
      { id: 10, image: card10 },
    ],
  },
]

const shuffle = <T,>(items: T[]) => {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export const buildDeck = (level: LevelConfig): GameCard[] => {
  return shuffle(
    level.faces.flatMap((face) => [
      { id: `${face.id}-a`, faceId: face.id, image: face.image, matched: false },
      { id: `${face.id}-b`, faceId: face.id, image: face.image, matched: false },
    ]),
  )
}
