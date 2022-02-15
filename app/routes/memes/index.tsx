/* eslint-disable no-console */
import type { LoaderFunction } from 'remix'
import { useLoaderData } from 'remix'

import { MainHeader } from '~/components/Header'
import type { Meme } from '~/components/MemeItem'
import { MemeItem } from '~/components/MemeItem'
import { db } from '~/firebase-service.server'

export const loader: LoaderFunction = async () => {
  const snapshot = await db.ref('/entries').limitToFirst(10).once('value')

  return snapshot.val()
}

export default function Index() {
  const data = useLoaderData<Record<string, Meme>>()
  const memes = Object.values(data)

  return (
    <>
      <MainHeader />

      <main>
        {memes.map((meme) => (
          <MemeItem meme={meme} linkTo={meme.id} key={meme.id} />
        ))}
      </main>
    </>
  )
}
