import { useEffect, useRef, useState } from 'react'
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
import cardCover from './assets/card-cover.png'
import './App.css'

type ScreenState = 'start' | 'playing' | 'levelComplete' | 'finished' | 'failed'

type CardFace = {
  id: number
  image: string
}

type GameCard = {
  id: string
  faceId: number
  image: string
  matched: boolean
}

type LevelConfig = {
  label: string
  pairs: number
  time: number
  faces: CardFace[]
}

const levels: LevelConfig[] = [
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

const buildDeck = (level: LevelConfig): GameCard[] => {
  return shuffle(
    level.faces.flatMap((face) => [
      { id: `${face.id}-a`, faceId: face.id, image: face.image, matched: false },
      { id: `${face.id}-b`, faceId: face.id, image: face.image, matched: false },
    ]),
  )
}

function App() {
  const [screen, setScreen] = useState<ScreenState>('start')
  const [levelIndex, setLevelIndex] = useState(0)
  const [cards, setCards] = useState<GameCard[]>(() => buildDeck(levels[0]))
  const [flippedIds, setFlippedIds] = useState<string[]>([])
  const [timeLeft, setTimeLeft] = useState(levels[0].time)
  const [removeLeft, setRemoveLeft] = useState(2)
  const [addTimeLeft, setAddTimeLeft] = useState(3)
  const [timeExpired, setTimeExpired] = useState(false)
  const [transitionSeconds, setTransitionSeconds] = useState(3)
  const [isBoardLocked, setIsBoardLocked] = useState(false)
  const [assetsLoaded, setAssetsLoaded] = useState(false)
  const [cardSize, setCardSize] = useState({ width: 0, height: 0 })

  const timerRef = useRef<number | null>(null)
  const flipTimeoutRef = useRef<number | null>(null)
  const transitionRef = useRef<number | null>(null)
  const boardRef = useRef<HTMLDivElement | null>(null)

  const currentLevel = levels[levelIndex]
  const totalCards = currentLevel.pairs * 2
  const matchedCount = cards.filter((card) => card.matched).length
  const flippedCount = flippedIds.length
  const boardColumns = [2, 3, 4, 5][levelIndex] ?? 4

  const clearTimer = () => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  const clearFlipTimeout = () => {
    if (flipTimeoutRef.current !== null) {
      window.clearTimeout(flipTimeoutRef.current)
      flipTimeoutRef.current = null
    }
  }

  const clearTransitionTimer = () => {
    if (transitionRef.current !== null) {
      window.clearInterval(transitionRef.current)
      transitionRef.current = null
    }
  }

  const startLevel = (index: number) => {
    const nextLevel = levels[index]
    clearTimer()
    clearFlipTimeout()
    clearTransitionTimer()
    setLevelIndex(index)
    setCards(buildDeck(nextLevel))
    setFlippedIds([])
    setTimeLeft(nextLevel.time)
    setRemoveLeft(2)
    setTimeExpired(false)
    setTransitionSeconds(3)
    setIsBoardLocked(false)
    setScreen('playing')
  }

  const startGame = () => {
    setAddTimeLeft(3)
    startLevel(0)
  }

  const startFromFourthLevel = () => {
    setAddTimeLeft(3)
    startLevel(3)
  }

  const restartGame = () => {
    setAddTimeLeft(3)
    startLevel(0)
  }

  const handleCardClick = (card: GameCard) => {
    if (screen !== 'playing' || isBoardLocked || card.matched || flippedIds.includes(card.id)) {
      return
    }

    const nextFlipped = [...flippedIds, card.id]
    setFlippedIds(nextFlipped)

    if (nextFlipped.length === 2) {
      const firstCard = cards.find((item) => item.id === nextFlipped[0])
      const secondCard = cards.find((item) => item.id === nextFlipped[1])
      if (!firstCard || !secondCard) {
        return
      }

      if (firstCard.faceId === secondCard.faceId) {
        setCards((prev) =>
          prev.map((item) =>
            item.faceId === firstCard.faceId ? { ...item, matched: true } : item,
          ),
        )
        setFlippedIds([])
        return
      }

      setIsBoardLocked(true)
      clearFlipTimeout()
      flipTimeoutRef.current = window.setTimeout(() => {
        setFlippedIds([])
        setIsBoardLocked(false)
      }, 600)
    }
  }

  const handleRemovePair = () => {
    if (screen !== 'playing' || removeLeft <= 0 || isBoardLocked) {
      return
    }

    const unmatchedGroups = cards.reduce<Record<number, GameCard[]>>((groups, card) => {
      if (!card.matched) {
        groups[card.faceId] = groups[card.faceId] ? [...groups[card.faceId], card] : [card]
      }
      return groups
    }, {})

    const pairToRemove = Object.values(unmatchedGroups).find((group) => group.length >= 2)
    if (!pairToRemove) {
      return
    }

    const removeIds = pairToRemove.slice(0, 2).map((card) => card.id)
    setCards((prev) =>
      prev.map((card) =>
        removeIds.includes(card.id) ? { ...card, matched: true } : card,
      ),
    )
    setFlippedIds((prev) => prev.filter((id) => !removeIds.includes(id)))
    setRemoveLeft((prev) => prev - 1)
  }

  const handleAddTime = () => {
    if (screen !== 'playing' || addTimeLeft <= 0) {
      return
    }

    setTimeLeft((prev) => prev + 10)
    setAddTimeLeft((prev) => prev - 1)
    if (timeExpired) {
      setTimeExpired(false)
      setIsBoardLocked(false)
    }
  }

  useEffect(() => {
    const preloadSources = [
      cardCover,
      card1,
      card2,
      card3,
      card4,
      card5,
      card6,
      card7,
      card8,
      card9,
      card10,
    ]
    const imagePromises = preloadSources.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image()
          img.onload = () => resolve()
          img.src = src
        }),
    )

    Promise.all(imagePromises).then(() => {
      setAssetsLoaded(true)
    })
  }, [])

  useEffect(() => {
    if (screen !== 'playing' || timeExpired) {
      clearTimer()
      return
    }

    clearTimer()
    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => {
      clearTimer()
    }
  }, [screen, levelIndex, timeExpired])

  useEffect(() => {
    if (screen !== 'playing') {
      return
    }

    if (timeLeft <= 0) {
      clearTimer()
      if (addTimeLeft > 0) {
        setTimeExpired(true)
        setIsBoardLocked(true)
      } else {
        setScreen('failed')
        setIsBoardLocked(true)
      }
    }
  }, [timeLeft, screen, addTimeLeft])

  useEffect(() => {
    if (screen !== 'playing') {
      return
    }

    if (matchedCount === totalCards && totalCards > 0) {
      clearTimer()
      setScreen('levelComplete')
      setIsBoardLocked(true)
    }
  }, [matchedCount, totalCards, screen])

  useEffect(() => {
    if (screen !== 'levelComplete') {
      clearTransitionTimer()
      return
    }

    setTransitionSeconds(3)
    clearTransitionTimer()
    transitionRef.current = window.setInterval(() => {
      setTransitionSeconds((prev) => prev - 1)
    }, 1000)

    return () => {
      clearTransitionTimer()
    }
  }, [screen, levelIndex])

  useEffect(() => {
    const updateCardSize = () => {
      const boardEl = boardRef.current
      if (!boardEl) {
        return
      }

      const columns = boardColumns
      const rows = Math.ceil(cards.length / columns)
      const gap = 16
      const boardRect = boardEl.getBoundingClientRect()
      const availableWidth = boardRect.width - gap * (columns - 1)
      const availableHeight = Math.max(
        0,
        window.innerHeight - boardRect.top - 12 - (rows - 1) * gap,
      )

      const maxWidthPerCard = Math.floor(availableWidth / columns)
      const maxHeightPerCard = Math.floor(availableHeight / rows)
      const computedWidth = Math.max(60, Math.min(maxWidthPerCard, Math.floor(maxHeightPerCard / 1.3)))
      const computedHeight = Math.round(computedWidth * 1.3)

      setCardSize({ width: computedWidth, height: computedHeight })
    }

    updateCardSize()
    window.addEventListener('resize', updateCardSize)
    return () => window.removeEventListener('resize', updateCardSize)
  }, [boardColumns, cards.length, screen])

  useEffect(() => {
    if (screen !== 'levelComplete') {
      return
    }

    if (transitionSeconds <= 0) {
      const nextIndex = levelIndex + 1
      if (nextIndex >= levels.length) {
        setScreen('finished')
      } else {
        startLevel(nextIndex)
      }
    }
  }, [transitionSeconds, screen, levelIndex])

  const renderPlayingHeader = () => (
    <div className="playing-header">
      <div className="header-left">
        <div className="timer-circle">{Math.max(timeLeft, 0)}</div>
        <div className="progress-text">
          <div className="progress-label">当前进度</div>
          <div className="progress-value">关卡 {levelIndex + 1}/{levels.length}</div>
        </div>
      </div>
      <div className="header-right">
        <button
          className="remove-card-button"
          type="button"
          onClick={handleRemovePair}
          disabled={removeLeft <= 0 || screen !== 'playing' || isBoardLocked}
        >
          消除卡 {removeLeft}/2
        </button>
      </div>
    </div>
  )

  const renderStartDecor = () => (
    <div className="start-decor">
      {[0, 1, 2].map((index) => (
        <div key={index} className={`start-decor-card card-${index + 1}`}>
          <img src={cardCover} alt="开始装饰卡片" />
        </div>
      ))}
    </div>
  )

  const renderBoard = () => {
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
              onClick={() => handleCardClick(card)}
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

  const renderTimeExpiredPrompt = () => {
    if (!timeExpired || addTimeLeft <= 0) {
      return null
    }

    return (
      <div className="time-expired-overlay">
        <div className="time-expired-card">
          <div className="time-expired-title">时间到啦！</div>
          <div className="time-expired-text">你还有 {addTimeLeft} 张加时卡，可继续补时 10 秒。</div>
          <button className="primary-button large" type="button" onClick={handleAddTime}>
            使用加时卡 +10s
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="app-shell">
      <div className="game-panel">
        <header className="game-header">
          <h1>翻翻乐记忆游戏</h1>
          <p>4 关挑战：不同卡片数量和时间限制，使用道具助你通关。</p>
        </header>

        {screen === 'start' && (
          <section className="center-screen">
            <div className="message-card">
              {renderStartDecor()}
              <h2>准备开始了吗？</h2>
              <p>可可嫑嫑米米是最好的好朋友。</p>
              <button
                className="primary-button large"
                type="button"
                onClick={startGame}
                disabled={!assetsLoaded}
              >
                {assetsLoaded ? '开始游戏' : '正在加载图片...'}
              </button>
              <div className="start-divider">或</div>
              <button
                className="primary-button large"
                type="button"
                onClick={startFromFourthLevel}
                disabled={!assetsLoaded}
              >
                直接从第四关开始
              </button>
            </div>
          </section>
        )}

        {screen === 'playing' && (
          <>
            {renderPlayingHeader()}
            {renderBoard()}
            {renderTimeExpiredPrompt()}
          </>
        )}

        {screen === 'levelComplete' && (
          <section className="center-screen">
            <div className="message-card">
              <h2>{currentLevel.label} 通关！</h2>
              <p>下一关将在 {transitionSeconds} 秒后开始。</p>
              <button className="primary-button large" type="button" onClick={() => setTransitionSeconds(0)}>
                立即进入下一关
              </button>
            </div>
          </section>
        )}

        {screen === 'finished' && (
          <section className="center-screen">
            <div className="message-card">
              <h2>恭喜你！全关通关</h2>
              <p>你已经完成所有 4 个关卡。</p>
              <button className="primary-button large" type="button" onClick={restartGame}>
                再来一次
              </button>
            </div>
          </section>
        )}

        {screen === 'failed' && (
          <section className="center-screen">
            <div className="message-card">
              <h2>挑战失败</h2>
              <p>时间耗尽，游戏结束。请从第一关重新开始。</p>
              <button className="primary-button large" type="button" onClick={restartGame}>
                重新开始
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default App
