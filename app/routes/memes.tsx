import { Outlet } from 'remix'

import styles from '~/styles/memes.css'

export function links() {
  return [{ rel: 'stylesheet', href: styles }]
}

export default function Index() {
  return (
    <section className="page">
      <Outlet />
    </section>
  )
}
