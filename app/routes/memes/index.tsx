/* eslint-disable no-console */
import { useEffect, useState } from 'react'
import type { LoaderFunction } from 'remix'
import { useFetcher } from 'remix'
import { useLoaderData } from 'remix'

import { MainHeader } from '~/components/Header'
import type { Meme } from '~/components/MemeItem'
import { MemeItem } from '~/components/MemeItem'
import { db } from '~/firebase-service.server'

export const loader: LoaderFunction = async ({ request }) => {
  const sortByDate = (a: Meme, b: Meme) => Number(b.createdAt) - Number(a.createdAt)

  const MAX_ITEMS = 20
  const ref = '/entries'

  const url = new URL(request.url)
  const lastMemeDate = url.searchParams.get('last-meme-date')

  let snapshot

  if (lastMemeDate) {
    snapshot = await db
      .ref(ref)
      .orderByChild('createdAt')
      .endBefore(Number(lastMemeDate))
      .limitToLast(MAX_ITEMS)
      .get()
  } else {
    snapshot = await db.ref(ref).orderByChild('createdAt').limitToLast(MAX_ITEMS).get()
  }

  return (Object.values(snapshot.val()) as Meme[]).sort(sortByDate)
}

export default function Index() {
  const data = useLoaderData<Meme[]>()
  const fetcher = useFetcher<Meme[]>()
  const [memes, setMemes] = useState(data)

  useEffect(() => {
    if (fetcher.data) {
      const newMemes = Object.values(fetcher.data)

      setMemes((memes) => [...memes, ...newMemes])
    }
  }, [fetcher.data])

  const onLoadMore = () => {
    const lastMeme = memes[memes.length - 1]
    fetcher.load(`/memes?last-meme-date=${lastMeme.createdAt}`)
  }

  const isLoadingMore = fetcher.state === 'loading' || fetcher.state === 'submitting'

  return (
    <>
      <MainHeader />

      <main>
        {memes.map((meme) => (
          <MemeItem meme={meme} linkTo={meme.id} key={meme.id} />
        ))}

        <button className="load-more" onClick={onLoadMore} disabled={isLoadingMore}>
          {isLoadingMore ? 'Loading...' : 'More'}
        </button>
      </main>
    </>
  )
}
