type FailedScreenProps = {
  onRestart: () => void
}

export default function FailedScreen({ onRestart }: FailedScreenProps) {
  return (
    <section className="center-screen">
      <div className="message-card">
        <h2>挑战失败</h2>
        <p>时间耗尽，游戏结束。请从第一关重新开始。</p>
        <button className="primary-button large" type="button" onClick={onRestart}>
          重新开始
        </button>
      </div>
    </section>
  )
}
