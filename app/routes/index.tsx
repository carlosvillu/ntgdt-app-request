import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { db } from "~/firebase-service.server";

export let loader: LoaderFunction = async () => {
  const snapshot = await db.ref('/entries').limitToFirst(10).once('value')
  return  snapshot.val()
};

export default function Index() {
  const data = useLoaderData<Record<string, {id:string; image: string}>>()
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>NTGDT</h1>
      {Object.values(data).map(meme => <img key={meme.id} src={meme.image} />)}
    </div>
  );
}
