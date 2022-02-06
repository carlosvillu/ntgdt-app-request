import type { LoaderFunction } from 'remix'
import { useLoaderData, useLocation, useNavigate } from 'remix'
import invariant from 'tiny-invariant'

import { db } from '~/firebase-service.server'
import styles from '~/styles/meme.css'

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.id, 'ID undefined')
  const snapshot = await db.ref(`/entries/${params.id}`).once('value')

  return snapshot.val()
}

interface Meme {
  id: string
  image: string
}

interface State {
  current?: number
  memes?: Meme[]
  internal?: boolean
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }]
}

export default function Index() {
  const navigate = useNavigate()
  const location = useLocation()
  const meme = useLoaderData<Meme>()

  const state = location.state as State | undefined
  const memes = state?.memes
  const currentMemeId = state?.current
  const nextMeme = memes && currentMemeId !== undefined && memes[currentMemeId + 1]
  const isInternal = state?.internal

  const onGoBack = () => {
    return isInternal ? navigate(-1) : navigate('../')
  }

  const onGoFoward = () => {
    if (!nextMeme || !state.current) return navigate('../')

    navigate(`../${nextMeme.id}`, {
      state: { ...state, current: state.current + 1 },
      replace: true
    })
  }

  return (
    <main className="meme">
      <header>
        <button onClick={onGoBack}>{isInternal ? 'Return to memes' : 'Home'}</button>
        {nextMeme && <button onClick={onGoFoward}>Foward</button>}
      </header>
      <div className="memeImg">
        <img key={meme.id} src={meme.image} />
      </div>
    </main>
  )
}
