import { Link, useLoaderData } from 'remix'
import type { LoaderFunction } from 'remix'
import { db } from '~/firebase-service.server'
import { MainHeader } from '~/components/Header'

export let loader: LoaderFunction = async () => {
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
        {memes.map((meme, index) => (
          <Link
            to={meme.id}
            state={{ internal: true, memes, current: index }}
            key={meme.id}
            className="meme-item"
          >
            <img src={meme.image} />
          </Link>
        ))}
      </main>
    </>
  )
}
