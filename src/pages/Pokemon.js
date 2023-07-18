import React, { useEffect, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image';
import ProgressBar from 'react-bootstrap/ProgressBar';
import PokemonService from "../service/PokemonService";
import Spinner from 'react-bootstrap/Spinner';
import { useParams } from "react-router-dom";

const Pokemon = () => {
    const api = PokemonService();
    let { id } = useParams();

    const [pokemon, setPokemon] = useState([]);
    const [showSpinner, setShowSpinner] = useState(true);
    const [showPokemons, setShowPokemons] = useState(false);
    useEffect(()=>{
        api.getName(id)
            .then((pokemonData) => {
                console.log(pokemonData);
                setPokemon(pokemonData);
                setShowSpinner(false);
                setShowPokemons(true);
            }).catch(err => {
                console.log(err);
            });
    }, []);
    let images = [];
    for (const key in pokemon.sprites) {
        if(pokemon.sprites[key] && typeof pokemon.sprites[key] == "string"){
            images.push(<Col key={key}><Image src={pokemon.sprites[key]} /></Col>)
        }
    }
    
  return (
    <>
        <Spinner animation="grow" size="xl" className={"mx-auto my-5 " + (showSpinner ? "d-block" : "d-none")}/>
        <Row className={showPokemons ? "" : "d-none"}>
            <Col md={4} className="mb-3">
            <Card bg={'white'} text={'dark'} border="info">
                        <Card.Img variant="top" src={pokemon.sprites && pokemon.sprites.front_default} />
                        <Card.Body>
                            <Card.Title>{pokemon.name && (pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1))}</Card.Title>
                            <Card.Body className="p-0">
                            <h5>Base Experience</h5>
                            <ProgressBar striped variant="danger" now={pokemon.base_experience} label={`${pokemon.base_experience}%`} className="mb-2" />
                            <Stack direction="horizontal" gap={2} className="mb-1">
                                <Button variant="success">
                                    Height <Badge bg="secondary">{pokemon.height}</Badge>
                                </Button>
                                <Button variant="success">
                                    Weight <Badge bg="secondary">{pokemon.weight}</Badge>
                                </Button>

                            </Stack>
                            <Stack direction="horizontal" gap={2} className="mb-1">
                                {
                                    pokemon.types && pokemon.types.map((type) => (
                                        <Badge pill bg="primary" key={type.slot}>{type.type.name}</Badge>
                                    ))
                                }
                            </Stack>
                            <Stack direction="horizontal" gap={2} className="mb-1">
                                {
                                    pokemon.abilities && pokemon.abilities.map((ability) => (
                                        <Badge pill bg="success" key={ability.slot}>{ability.ability.name}</Badge>
                                    ))
                                }
                            </Stack>
                            </Card.Body>
                        </Card.Body>
                    </Card>
            </Col>
            <Col md={8}>
                <Card bg={'white'} text={'dark'} border="info">
                    <Card.Body>
                        <Card.Title>Images</Card.Title>
                        <Card.Body className="p-0">
                            <Row>
                                {images}
                            </Row>
                        </Card.Body>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </>
  );
};

export default Pokemon;
