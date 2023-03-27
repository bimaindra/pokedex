export default function Card({ name, id }) {
  return (
    <>
      <div className="cursor-pointer rounded-md border p-4 shadow-lg transition hover:shadow">
        <span className="small">#PokemonID_{id}</span>
        <h2 className="mt-2 font-bold">{name.toUpperCase()}</h2>
      </div>
    </>
  );
}
