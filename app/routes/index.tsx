import { redirect } from 'remix'
import type { LoaderFunction } from 'remix'

export let loader: LoaderFunction = async () => {
  return redirect('/memes')
}
