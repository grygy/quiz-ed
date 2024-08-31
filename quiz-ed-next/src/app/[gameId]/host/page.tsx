export default function Page({ params }: { params: { gameId: string } }) {
  const gameId = params.gameId;

  return <div>HOST, Game id:{gameId}</div>;
}
