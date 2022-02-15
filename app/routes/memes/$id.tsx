import type { LoaderFunction } from 'remix'
import { useLoaderData, useLocation, useNavigate } from 'remix'
import invariant from 'tiny-invariant'

import { MainHeader } from '~/components/Header'
import type { Meme } from '~/components/MemeItem'
import { MemeItem } from '~/components/MemeItem'
import { db } from '~/firebase-service.server'
import styles from '~/styles/meme.css'

interface Data {
  currentMeme: Meme
  relatedMemes: Record<string, Meme>
}

interface State {
  current?: number
  memes?: Meme[]
  internal?: boolean
}

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.id, 'ID undefined')
  const currentMeme = await db.ref(`/entries/${params.id}`).once('value')
  // TODO: get related memes, maybe using same meme provider
  const relatedMemes = await db.ref('/entries').limitToLast(10).once('value')

  return {
    currentMeme: currentMeme.val(),
    relatedMemes: relatedMemes.val()
  }
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }]
}

export default function Index() {
  const navigate = useNavigate()
  const location = useLocation()
  const data = useLoaderData<Data>()
  const { currentMeme, relatedMemes } = data

  const state = location.state as State | undefined
  const isInternal = state?.internal

  const onGoBack = () => {
    return isInternal ? navigate(-1) : navigate('../')
  }

  return (
    <>
      <MainHeader onGoBack={onGoBack} />

      <main>
        <div className="meme-item">
          <img key={currentMeme.id} src={currentMeme.image} />
        </div>

        {Object.values(relatedMemes).map((meme) => (
          <MemeItem meme={meme} key={meme.id} />
        ))}
      </main>
    </>
  )
}
