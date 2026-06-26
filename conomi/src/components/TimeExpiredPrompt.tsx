type TimeExpiredPromptProps = {
  addTimeLeft: number
  onAddTime: () => void
}

export default function TimeExpiredPrompt({ addTimeLeft, onAddTime }: TimeExpiredPromptProps) {
  return (
    <div className="time-expired-overlay">
      <div className="time-expired-card">
        <div className="time-expired-title">时间到啦！</div>
        <div className="time-expired-text">你还有 {addTimeLeft} 张加时卡，可继续补时 10 秒。</div>
        <button className="primary-button large" type="button" onClick={onAddTime}>
          使用加时卡 +10s
        </button>
      </div>
    </div>
  )
}
