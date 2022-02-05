import type { LoaderFunction } from 'remix'

import { useLoaderData, useLocation, useNavigate } from 'remix'
import invariant from 'tiny-invariant'

import { db } from '~/firebase-service.server'

export let loader: LoaderFunction = async ({ params }) => {
  invariant(params.id, 'ID undefined')
  const snapshot = await db.ref(`/entries/${params.id}`).once('value')

  return snapshot.val()
}


interface Meme {
  id: string;
  image: string;
}

interface State {
  current?: number;
  memes?: Meme[];
  internal?: boolean
}

export default function Index() {
  const navigate = useNavigate()
  const location = useLocation()
  const meme = useLoaderData<{ id: string; image: string }>()

  const state = location.state as State
  const memes = state?.memes
  const currentMemeId = state.current
  const nextMeme = (memes && currentMemeId) && memes[currentMemeId + 1]
  const isInternal = state.internal
  const onGoBack = () => isInternal ? navigate(-1) : navigate('../')
  

  const onGoFoward = () => {
    if(!nextMeme || ! state.current) return navigate('../')

    navigate(`../${nextMeme.id}`, {
      state: { state, current: state.current + 1 },
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
