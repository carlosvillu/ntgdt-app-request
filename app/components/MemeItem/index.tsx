import { useNavigate } from 'remix'

export interface Meme {
  createdAt: number
  id: string
  image: string
  image_blur: string
  link?: string
  site?: string
  title?: string
  height: number
  width: number
}

interface MemeItemProps {
  detailLink?: {
    linkTo: string
    state: { memes: Meme[] }
  }
  meme: Meme
}

export const MemeItem = ({ detailLink, meme }: MemeItemProps) => {
  const navigate = useNavigate()

  const onClickMeme = () => {
    const position = window.scrollY

    detailLink && navigate(detailLink?.linkTo, { state: { ...detailLink.state, position } })
  }

  return (
    <div className="meme-item" key={meme.id}>
      {meme.title && (
        <div className="meme-item__title">
          <h2>{meme.title}</h2>
        </div>
      )}

      {detailLink ? (
        <div
          onClick={onClickMeme}
          style={{
            backgroundImage: `url(${meme.image_blur})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            cursor: 'pointer'
          }}
        >
          <img
            src={meme.image}
            className="meme-item__image"
            height={meme.height}
            width={meme.width}
            loading="lazy"
          />
        </div>
      ) : (
        <img src={meme.image} className="meme-item__image" />
      )}

      {meme.site && meme.link && (
        <div className="meme-item__footer">
          <span className="meme-item__date">{new Date(meme.createdAt).toLocaleDateString()}</span>
          <a href={meme.link} rel="noopener noreferrer" target="_blank" className="meme-item__site">
            {meme.site} <i className="fa-solid fa-square-arrow-up-right"></i>
          </a>
        </div>
      )}
    </div>
  )
}
