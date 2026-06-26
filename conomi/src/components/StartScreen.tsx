import { memo } from 'react'

type StartScreenProps = {
  assetsLoaded: boolean
  cardCover: string
  onStart: () => void
  onStartFromFourthLevel: () => void
}

const StartScreen = ({ assetsLoaded, cardCover, onStart, onStartFromFourthLevel }: StartScreenProps) => (
  <section className="center-screen">
    <div className="message-card">
      <div className="start-decor">
        {[0, 1, 2].map((index) => (
          <div key={index} className={`start-decor-card card-${index + 1}`}>
            <img src={cardCover} alt="开始装饰卡片" />
          </div>
        ))}
      </div>
      <h2>准备开始了吗？</h2>
      <p>可可嫑嫑米米是最好的好朋友。</p>
      <button
        className="primary-button large"
        type="button"
        onClick={onStart}
        disabled={!assetsLoaded}
      >
        {assetsLoaded ? '开始游戏' : '正在加载图片...'}
      </button>
      <div className="start-divider">或</div>
      <button
        className="primary-button large"
        type="button"
        onClick={onStartFromFourthLevel}
        disabled={!assetsLoaded}
      >
        直接从第四关开始
      </button>
    </div>
  </section>
)

export default memo(StartScreen)
