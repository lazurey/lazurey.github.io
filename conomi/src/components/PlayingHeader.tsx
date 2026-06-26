type PlayingHeaderProps = {
  timeLeft: number
  levelIndex: number
  totalLevels: number
  removeLeft: number
  isBoardLocked: boolean
  onRemovePair: () => void
}

export default function PlayingHeader({
  timeLeft,
  levelIndex,
  totalLevels,
  removeLeft,
  isBoardLocked,
  onRemovePair,
}: PlayingHeaderProps) {
  return (
    <div className="playing-header">
      <div className="header-left">
        <div className="timer-circle">{Math.max(timeLeft, 0)}</div>
        <div className="progress-text">
          <div className="progress-label">当前进度</div>
          <div className="progress-value">关卡 {levelIndex + 1}/{totalLevels}</div>
        </div>
      </div>
      <div className="header-right">
        <button
          className="remove-card-button"
          type="button"
          onClick={onRemovePair}
          disabled={removeLeft <= 0 || isBoardLocked}
        >
          消除卡 {removeLeft}/2
        </button>
      </div>
    </div>
  )
}
