import { useLoaderData, useLocation, useNavigate } from 'remix'
import type { LoaderFunction } from 'remix'
import { db } from '~/firebase-service.server'
import memeStyles from '~/styles/meme.css'

export let loader: LoaderFunction = async ({ params }) => {
  const snapshot = await db.ref(`/entries/${params.id}`).once('value')

  return snapshot.val()
}

export function links() {
  return [{ rel: 'stylesheet', href: memeStyles }]
}

export default function Index() {
  const navigate = useNavigate()
  const location = useLocation()
  const meme = useLoaderData<{ id: string; image: string }>()

  const memes = location.state?.memes
  const currentMemeId = location.state?.current
  const nextMeme = memes && memes[currentMemeId + 1]
  const isInternal = location.state?.internal

  console.log(memes, currentMemeId, nextMeme, memes?.length)

  const onGoBack = () => {
    // TO restore the scroll on previous page if is internal
    isInternal ? navigate(-1) : navigate('../')
  }

  const onGoFoward = () => {
    navigate(`../${nextMeme.id}`, {
      state: { ...location.state, current: location.state?.current + 1 },
      replace: true,
    })
  }

  return (
    <div className="meme">
      <div className="navigation">
        <button onClick={onGoBack}>
          {isInternal ? 'Return to memes' : 'Home'}
        </button>
        {nextMeme && <button onClick={onGoFoward}>Foward</button>}
      </div>
      <img key={meme.id} src={meme.image} />
    </div>
  )
}
