import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Container, Row, Button, DropdownToggle, ListGroupItem, 
         NavbarBrand, Navbar, Popover, PopoverHeader, PopoverBody, ListGroup, CardImg} from 'reactstrap';
import Movie from './components/Movie';


function App() {

  //// Mise en place du compteur de films avec un state 'number' ////
  const [moviesCount, setMoviesCount] = useState(0)
  // Ici on utilise le state 'array', pour ouvrir un tableau vide moviesWishList
  const [moviesWishList, setMoviesWishList] = useState([])
  
  // Copie depuis la doc reactstrap pour le Popover
  const [popoverOpen, setPopoverOpen] = useState(false);
  const toggle = () => setPopoverOpen(!popoverOpen);
  
  //// Fonction rajout de films dans moviesWishList ////
  var handleClickAddMovie = (name, img) => {
    setMoviesWishList([...moviesWishList, { name: name, img: img}])
    setMoviesCount(moviesCount + 1)
  }
  
  //// Fonction delete de films dans moviesWishList ////
  // (à placer au dessus de la variable : movieList = moviesData.map, sinon ça marche pas)
  var handleClickDeleteMovie = (deleteMovie) => {
    //console.log(deleteName)
    // On filtre moviesWishList, et on renvoit un tableau avec tous les elements/films qui ne sont pas le film qui est passé dans deleteMovie.
    setMoviesWishList(moviesWishList.filter((element)=>(element.name !== deleteMovie)))
    setMoviesCount(moviesCount - 1)
  }
 
  //// Push moviesWishList dans le Popover ////
  var cardWish = moviesWishList.map((element, index) => 
    <ListGroupItem key={index} onClick={() => handleClickDeleteMovie(element.name)}>
      <CardImg src={element.img} alt="hi" width="25%" />
      <span> {element.name}</span>
    </ListGroupItem>)
  // console.log(cardWish)
  
  // Nos données de base
  var moviesData = [
    { name: "Star Wars", desc: "La conclusion de la saga Skywalker. De nouvelles légendes vont naître dans cette ...", img: "/img/starwars.jpg", note: 6.7, vote: 5 },
    { name: "Maléfique : Le pouvoir du mal", desc: "Plusieurs années après avoir découvert pourquoi la plus célèbre méchante Disney avait un cœur ...", img: "img/maleficent.jpg", note: 6, vote: 3 },
    { name: "Jumanji", desc: "L’équipe est de retour, mais le jeu a changé. Alors qu’ils retournent dans Jumanji pour secourir ...", img: "img/jumanji.jpg", note: 10, vote: 5 },
    { name: "Once Upon a Time... in Hollywood", desc: "En 1969, Rick Dalton – star déclinante d'une série télévisée de western – et Cliff Booth, à hollywood essaye de...", img: "img/once_upon.jpg", note: 6, vote: 7 },
    { name: "La Reine des neiges 2", desc: "Elsa, Anna, Kristoff, Olaf et Sven voyagent bien au-delà des portes d’Arendelle à la recherche de réponses ...", img: "img/frozen.jpg", note: 4.6, vote: 3 },
    { name: "Terminator", desc: "De nos jours à Mexico. Dani Ramos, 21 ans, travaille sur une chaîne de montage dans une usine automobile...", img: "img/terminator.jpg", note: 6.1, vote: 1 },
    { name: "Bad Boy", desc: "Baaaaaad Boyyyyys", img: "img/badboy3.jpg", note: 8, vote: 27 }
  ]

  //// Création du tableau movieList ////
  var movieList = moviesData.map((elementMap, index) => {
    
    // On transforme le push principal avec une nouvelle props 'movieSeen', qui va remplacer le state 'likeMovie' dans Movie.js (une props ou un state, c'est la même chose, tous les deux contiennent juste de la data)
    var result = moviesWishList.find(elementFind => elementFind.name === elementMap.name)
    var seenMovie = true
    // Si la wishlist dans le Popover ne contient pas le film, alors le film n'a pas été vu 
    if(result === undefined) {
      seenMovie = false
    }

    return(
      <Movie key={index} movieSeen={seenMovie} movieName={elementMap.name} movieDesc={elementMap.desc} movieImg={elementMap.img} globalRating={elementMap.note} globalCountRating={elementMap.vote} handleClickAddMovieParent={handleClickAddMovie} handleClickDeleteMovieParent={handleClickDeleteMovie}/>
    )
  })
    
    
  return (

    <div style={{ backgroundColor: '#5A5B5C' }}>
      <Container>

        <Navbar color="light" expand="md" light className="me-auto" navbar sticky="top">
          <NavbarBrand href="/" style={{ color: '#3A3B3C' }}> Latest Movies</NavbarBrand>
          <NavbarBrand href="/">
            <img src="img/logo.png" width="30" height="30"
              className="d-inline-block align-top" alt="logo" />
          </NavbarBrand>

          <Nav className="me-auto" navbar>
              <DropdownToggle caret nav>
                <Button type="button" id="Popover1">{moviesCount} movies</Button>
              </DropdownToggle>
              <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
                <PopoverHeader>WishList</PopoverHeader>
                <PopoverBody>
                  <ListGroup>
                    {cardWish}
                  </ListGroup>
                </PopoverBody>
              </Popover>
          </Nav>
          
        </Navbar>

        <Row>
          {movieList}
        </Row>

      </Container>
    </div>

  );
}

export default App;