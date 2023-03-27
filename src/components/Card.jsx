export default function Card({ name, url, onHandleOpenDetail }) {
  const arr = url.split("/");
  const getPokemonID = arr[arr.length - 2];
  return (
    <>
      <div
        className="cursor-pointer rounded-md border p-4 shadow-lg transition hover:shadow"
        onClick={() => onHandleOpenDetail(url)}
      >
        <span className="small">#PokemonID_{getPokemonID}</span>
        <h2 className="mt-2 font-bold">{name.toUpperCase()}</h2>
      </div>
    </>
  );
}
