type FinishedScreenProps = {
  onRestart: () => void
}

export default function FinishedScreen({ onRestart }: FinishedScreenProps) {
  return (
    <section className="center-screen">
      <div className="message-card">
        <h2>恭喜你！全关通关</h2>
        <p>你已经完成所有 4 个关卡。</p>
        <button className="primary-button large" type="button" onClick={onRestart}>
          再来一次
        </button>
      </div>
    </section>
  )
}
