import React, { useEffect, useState } from "react";

const Main = () => {

const [counter, setCounter] = useState(0);
const [pokemons, setPokemons] = useState([]);
useEffect(()=>{
  fetch("https://pokeapi.co/api/v2/pokemon")
    .then((resp) =>{
      return resp.json();
    })
    .then((resp) => {
      console.log(resp);
    }).catch((err) => {
      console.log(err);
    });
}, []);
  return (
    <>
      <div>{counter}</div>
    </>
  );
};

export default Main;
