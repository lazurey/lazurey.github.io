import type { RefObject } from 'react'
import type { GameCard } from '../types'

type BoardProps = {
  cards: GameCard[]
  flippedIds: string[]
  cardSize: { width: number; height: number }
  boardColumns: number
  isBoardLocked: boolean
  flippedCount: number
  cardCover: string
  boardRef: RefObject<HTMLDivElement | null>
  onCardClick: (card: GameCard) => void
}

export default function Board({
  cards,
  flippedIds,
  cardSize,
  boardColumns,
  isBoardLocked,
  flippedCount,
  cardCover,
  boardRef,
  onCardClick,
}: BoardProps) {
  const gridColumns = cardSize.width
    ? `repeat(${boardColumns}, ${cardSize.width}px)`
    : `repeat(${boardColumns}, minmax(80px, 1fr))`

  return (
    <div
      ref={boardRef}
      className="board"
      style={{ gridTemplateColumns: gridColumns, justifyContent: 'center' }}
    >
      {cards.map((card) => {
        const isFlipped = flippedIds.includes(card.id) || card.matched
        return (
          <button
            key={card.id}
            type="button"
            className={`card-button ${isFlipped ? 'flipped' : ''} ${card.matched ? 'matched' : ''}`}
            onClick={() => onCardClick(card)}
            disabled={isBoardLocked || flippedCount === 2}
            style={cardSize.width ? { width: `${cardSize.width}px`, height: `${cardSize.height}px` } : undefined}
          >
            <div className="card-inner">
              <div className="card-face card-front">
                <img src={card.image} alt="卡片" />
              </div>
              <div
                className="card-face card-back"
                style={{ backgroundImage: `url(${cardCover})` }}
              />
            </div>
          </button>
        )
      })}
    </div>
  )
}
