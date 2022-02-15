import { Link } from 'remix'

export interface Meme {
  createdAt: string
  id: string
  image: string
  image_blur: string
  link?: string
  site?: string
  title?: string
  height: number
  width: string
}

interface MemeItemProps {
  linkTo?: string
  meme: Meme
}

export const MemeItem = ({ linkTo, meme }: MemeItemProps) => {
  return (
    <div className="meme-item" key={meme.id}>
      {meme.title && (
        <div className="meme-item__title">
          <h2>{meme.title}</h2>
        </div>
      )}

      {linkTo ? (
        <Link to={linkTo} state={{ internal: true }}>
          <img src={meme.image} className="meme-item__image" />
        </Link>
      ) : (
        <img src={meme.image} className="meme-item__image" />
      )}

      {meme.site && meme.link && (
        <div className="meme-item__site">
          <a href={meme.link} rel="noopener noreferrer" target="_blank">
            {meme.site} 
          </a>
        </div>
      )}
    </div>
  )
}
