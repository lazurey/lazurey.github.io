type LevelCompleteScreenProps = {
  levelLabel: string
  transitionSeconds: number
  onSkip: () => void
}

export default function LevelCompleteScreen({
  levelLabel,
  transitionSeconds,
  onSkip,
}: LevelCompleteScreenProps) {
  return (
    <section className="center-screen">
      <div className="message-card">
        <h2>{levelLabel} 通关！</h2>
        <p>下一关将在 {transitionSeconds} 秒后开始。</p>
        <button className="primary-button large" type="button" onClick={onSkip}>
          立即进入下一关
        </button>
      </div>
    </section>
  )
}
