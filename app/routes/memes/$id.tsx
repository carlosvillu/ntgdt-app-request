/* eslint-disable no-console */
import fontAwesome from '@fortawesome/fontawesome-free/css/fontawesome.css'
import fontAwesomeSolid from '@fortawesome/fontawesome-free/css/solid.css'
import { useEffect } from 'react'
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

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.id, 'ID undefined')

  const MAX_ITEMS = 20
  const ref = '/entries'
  const currentMeme = await db.ref(`/entries/${params.id}`).once('value')
  const currentSite = currentMeme.val().site

  // Get related memes using currentSite
  // Seems for a real filter needs a document instead a reference
  // TODO add pagination. Can order by site and createdAt?
  const relatedMemes = await db
    .ref(ref)
    .orderByChild('site')
    .equalTo(currentSite)
    .limitToLast(MAX_ITEMS)
    .once('value')
  // .get() // index not defined

  return {
    currentMeme: currentMeme.val(),
    relatedMemes: relatedMemes.val()
  }
}

export function links() {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'stylesheet', href: fontAwesome },
    { rel: 'stylesheet', href: fontAwesomeSolid }
  ]
}

export default function Index() {
  const navigate = useNavigate()
  const location = useLocation()
  const data = useLoaderData<Data>()
  const { currentMeme, relatedMemes } = data
  const state = location.state as Meme[] | undefined

  const onGoBack = () => {
    return navigate('../', { state })
  }

  // Custom browser go-back action (for send the state to main page)
  useEffect(() => {
    window.onpopstate = function (e) {
      e.preventDefault()
      onGoBack()
    }
  }, [onGoBack])

  return (
    <>
      <MainHeader onGoBack={onGoBack} />

      <main>
        <MemeItem meme={currentMeme} />

        {Object.values(relatedMemes).map((meme) => (
          <MemeItem meme={meme} key={meme.id} />
        ))}
      </main>
    </>
  )
}
