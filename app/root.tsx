import fontAwesome from '@fortawesome/fontawesome-free/css/fontawesome.css'
import fontAwesomeSolid from '@fortawesome/fontawesome-free/css/solid.css'
import type { MetaFunction } from 'remix'
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from 'remix'

import tailwindcss from './styles/tailwindcss.css'
import vars from './styles/vars.css'

export const meta: MetaFunction = () => {
  return { title: 'No Tengo Ganas De Trabajar' }
}

export function links() {
  return [
    { rel: 'stylesheet', href: vars },
    { rel: 'stylesheet', href: tailwindcss },
    { rel: 'stylesheet', href: fontAwesome },
    { rel: 'stylesheet', href: fontAwesomeSolid }
  ]
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}
