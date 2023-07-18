import { useState } from "react";

const PokemonService = () => {
    const baseUrl = "https://pokeapi.co/api/v2";
    const url = baseUrl+"/pokemon/";

    const getAll = async () => {
      const response = await fetch(url)
      const data = await response.json();
      console.log(data);

      const allPokemon = [];

      for(const pokemon of data.results){
        const _response = await fetch(pokemon.url);
        allPokemon.push(await _response.json());
      }
      return allPokemon;
    }

    const getName = async (name) => {
      const response = await fetch(url+name);
      const data = await response.json();
      return data;
    }
    // const getAll = async () => {
    //   _getAllList().then( response => {
    //     let results = response.results;
    //     let pokemons =  results.map(async (r) => {
    //       let response = await fetch(r.url);
    //       return await response.json();
    //     });
    //     return pokemons;
    //   }).then(pokemons => {
    //     console.log(pokemons);
    //   })
    //   .catch(err => console.log(err));
    // }

  return {
    getAll,
    getName,
  };
};

export default PokemonService;
