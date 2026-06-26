import { useEffect, useRef, useState } from 'react'
import cardCover from './assets/card-cover.png'
import './App.css'
import StartScreen from './components/StartScreen'
import PlayingHeader from './components/PlayingHeader'
import Board from './components/Board'
import TimeExpiredPrompt from './components/TimeExpiredPrompt'
import LevelCompleteScreen from './components/LevelCompleteScreen'
import FinishedScreen from './components/FinishedScreen'
import FailedScreen from './components/FailedScreen'
import { levels, buildDeck } from './game'
import type { ScreenState, GameCard } from './types'

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
      ...levels.flatMap((level) => level.faces.map((face) => face.image)),
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

  return (
    <div className="app-shell">
      <div className="game-panel">
        <header className="game-header">
          <h1>翻翻乐记忆游戏</h1>
          <p>4 关挑战：不同卡片数量和时间限制，使用道具助你通关。</p>
        </header>

        {screen === 'start' && (
          <StartScreen
            assetsLoaded={assetsLoaded}
            cardCover={cardCover}
            onStart={startGame}
            onStartFromFourthLevel={startFromFourthLevel}
          />
        )}

        {screen === 'playing' && (
          <>
            <PlayingHeader
              timeLeft={timeLeft}
              levelIndex={levelIndex}
              totalLevels={levels.length}
              removeLeft={removeLeft}
              isBoardLocked={isBoardLocked}
              onRemovePair={handleRemovePair}
            />
            <Board
              cards={cards}
              flippedIds={flippedIds}
              cardSize={cardSize}
              boardColumns={boardColumns}
              isBoardLocked={isBoardLocked}
              flippedCount={flippedCount}
              cardCover={cardCover}
              boardRef={boardRef}
              onCardClick={handleCardClick}
            />
            {timeExpired && addTimeLeft > 0 && (
              <TimeExpiredPrompt addTimeLeft={addTimeLeft} onAddTime={handleAddTime} />
            )}
          </>
        )}

        {screen === 'levelComplete' && (
          <LevelCompleteScreen
            levelLabel={currentLevel.label}
            transitionSeconds={transitionSeconds}
            onSkip={() => setTransitionSeconds(0)}
          />
        )}

        {screen === 'finished' && <FinishedScreen onRestart={restartGame} />}

        {screen === 'failed' && <FailedScreen onRestart={restartGame} />}
      </div>
    </div>
  )
}

export default App
