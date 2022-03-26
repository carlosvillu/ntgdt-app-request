import { Outlet } from 'remix'

import PageProgress from '~/components/PageProgress/PageProgress'
import headerStyles from '~/styles/Header.css'
import styles from '~/styles/memes.css'

export function links() {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'stylesheet', href: headerStyles }
  ]
}

export default function Index() {
  return (
    <section className="page">
      <PageProgress />

      <Outlet />
    </section>
  )
}
