import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import DataPokemons from "@/data/pokemon.json";
import Card from "@/components/Card";

export default function Home() {
  const [pokemons, setPokemons] = useState(DataPokemons);

  // pagination purpose
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 20;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = pokemons.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(pokemons.length / itemsPerPage);

  // invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % pokemons.length;
    setItemOffset(newOffset);
  };

  // handle search pokemon
  let timeout;
  const handleSearch = (keyword) => {
    // clear timeout to make sure only execute latest event
    clearTimeout(timeout);

    // if keyword empty set all list of pokemons
    if (!keyword) return setPokemons(DataPokemons);

    // debounce
    timeout = setTimeout(() => {
      setPokemons(
        pokemons.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    }, 1000);
  };

  return (
    <>
      <main className="py-10">
        <div className="container">
          <h1 className="mb-2 text-3xl font-bold">Pokedex</h1>
          <div className="mb-10 flex items-center justify-between">
            <p>
              Search for Pokémon by using the name or their National Pokédex
              number
            </p>
            <div>
              <input
                type="text"
                placeholder="Search here..."
                className="rounded-sm border py-2 px-4"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {currentItems &&
              currentItems.map((item, index) => {
                const arr = item.url.split("/");
                const getPokemonID = arr[arr.length - 2];
                return <Card key={index} name={item.name} id={getPokemonID} />;
              })}
          </div>
          <ReactPaginate
            className="mt-10 flex items-center justify-center -space-x-px border-t border-gray-200 bg-white px-4 py-6 pt-10 sm:px-6"
            pageLinkClassName="relative inline-flex h-full items-center px-4 py-2 font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            breakLinkClassName="relative inline-flex h-full items-center px-4 py-2 font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            previousLinkClassName="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            nextLinkClassName="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            activeLinkClassName="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-800 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
          />
        </div>
      </main>
    </>
  );
}
