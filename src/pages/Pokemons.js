import React, { useEffect, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import Pagination from 'react-bootstrap/Pagination';
import Layout from "./Layout";
import PokemonService from "../service/PokemonService";
import Spinner from 'react-bootstrap/Spinner';
import { Link } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";



const Pokemons = () => {
    const api = PokemonService();
    const [pokemons, setPokemons] = useState([]);
    const [showSpinner, setShowSpinner] = useState(true);
    const [showPokemons, setShowPokemons] = useState(false);
    useEffect(()=>{
        api.getAll()
            .then((pokemonData) => {
                setPokemons(pokemonData);
                setShowSpinner(false);
                setShowPokemons(true);
            }).catch(err => {
                console.log(err);
            });
    }, []);

    
  return (
    <>
        <Spinner animation="grow" size="xl" className={"mx-auto my-5 " + (showSpinner ? "d-block" : "d-none")}/>
        <Container className={showPokemons ? "" : "d-none"}>
        <Row>
            {pokemons.map((pokemon) => (
                <Col key={pokemon.name} sm={6} md={4} lg={3} className="mb-3">
                    <Card bg={'light'} text={'dark'} border="info">
                        <Card.Img variant="top" src={pokemon.sprites && pokemon.sprites.front_default} />
                        <Card.Body>
                            <Card.Title>{pokemon.name}</Card.Title>
                            <Card.Body className="p-0">
                            <Stack direction="horizontal" gap={2} className="mb-1">
                                {
                                    pokemon.types.map((type) => (
                                        <Badge pill bg="primary" key={type.slot}>{type.type.name}</Badge>
                                    ))
                                }
                            </Stack>
                            <Stack direction="horizontal" gap={2} className="mb-1">
                                {
                                    pokemon.abilities.map((ability) => (
                                        <Badge pill bg="success" key={ability.slot}>{ability.ability.name}</Badge>
                                    ))
                                }
                            </Stack>
                            </Card.Body>
                            <div className="d-grid gap-2">
                                <Link to={"/pokemons/"+pokemon.name} className="btn btn-outline-info btn-sm">View Details</Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
        <Pagination>
      <Pagination.First />
      <Pagination.Prev />
      <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Ellipsis />

      <Pagination.Item>{10}</Pagination.Item>
      <Pagination.Item>{11}</Pagination.Item>
      <Pagination.Item active>{12}</Pagination.Item>
      <Pagination.Item>{13}</Pagination.Item>
      <Pagination.Item disabled>{14}</Pagination.Item>

      <Pagination.Ellipsis />
      <Pagination.Item>{20}</Pagination.Item>
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
    </Container>
    </>
  );
};

export default Pokemons;
