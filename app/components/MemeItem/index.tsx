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
    <div
      className="snap-start w-full max-w-screen-big my-0 big:my-3 big:rounded-md flex flex-col bg-gray-900/60 text-gray-50"
      style={{ boxShadow: '0 0px 2px rgba(255, 255, 255, 0.5)' }}
      key={meme.id}
    >
      {meme.title && (
        <div className="mx-4 my-2">
          <h2>{meme.title}</h2>
        </div>
      )}

      {detailLink ? (
        <div
          onClick={onClickMeme}
          className="bg-cover bg-no-repeat cursor-pointer"
          style={{
            backgroundImage: `url(${meme.image_blur})`
          }}
        >
          <img src={meme.image} height={meme.height} width={meme.width} loading="lazy" />
        </div>
      ) : (
        <img src={meme.image} className="meme-item__image" />
      )}

      {meme.site && meme.link && (
        <div className="mx-4 my-2 flex justify-between items-center">
          <span className="text-gray-500 text-sm">
            {new Date(meme.createdAt).toLocaleDateString()}
          </span>
          <a
            href={meme.link}
            rel="noopener noreferrer"
            target="_blank"
            className="text-sky-500/50 hover:text-sky-500"
          >
            {meme.site} <i className="fa-solid fa-square-arrow-up-right"></i>
          </a>
        </div>
      )}
    </div>
  )
}
