import { Outlet } from 'remix'

import memeStyles from '~/styles/meme.css'

export function links() {
  return [{ rel: 'stylesheet', href: memeStyles }]
}

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <Outlet />
    </div>
  )
}
