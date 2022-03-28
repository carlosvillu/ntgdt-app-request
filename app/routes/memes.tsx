import { Outlet } from 'remix'

import PageProgress from '~/components/PageProgress/PageProgress'
import styles from '~/styles/memes.css'

export function links() {
  return [{ rel: 'stylesheet', href: styles }]
}

export default function Index() {
  return (
    <section className="flex flex-col bg-black">
      <PageProgress />

      <Outlet />
    </section>
  )
}
