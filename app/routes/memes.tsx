import { Outlet } from 'remix'
import styles from '~/styles/memes.css'

export function links() {
  return [{ rel: 'stylesheet', href: styles }]
}

import memeStyles from '~/styles/meme.css'

export function links() {
  return [{ rel: 'stylesheet', href: memeStyles }]
}

export default function Index() {
  return (
    <section className="page">
      <Outlet />
    </section>
  )
}
