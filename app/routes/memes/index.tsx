import type { LoaderFunction } from 'remix'
import { Link, useLoaderData } from 'remix'

import { MainHeader } from '~/components/Header'
import { db } from '~/firebase-service.server'

export const loader: LoaderFunction = async () => {
  const snapshot = await db.ref('/entries').limitToFirst(10).once('value')

  return snapshot.val()
}

export default function Index() {
  const data = useLoaderData<Record<string, { id: string; image: string }>>()
  const memes = Object.values(data)

  return (
    <>
      <MainHeader />

      <main>
        {memes.map((meme) => {
          return (
            <Link to={meme.id} state={{ internal: true }} key={meme.id} className="meme-item">
              <img src={meme.image} />
            </Link>
          )
        })}
      </main>
    </>
  )
}
