import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Container, Row, Button, UncontrolledDropdown, DropdownToggle, 
         DropdownMenu, DropdownItem, NavbarBrand, Navbar} from 'reactstrap';
import Movie from './components/Movie';


function App() {

  //equivalent de la base de données, ou JSON d'une API :
  var moviesData = [
    { name: "Star Wars : L'ascension de Skywalker", desc: "La conclusion de la saga Skywalker. De nouvelles légendes vont naître dans cette ...", img: "/img/starwars.jpg", note: 6.7, vote: 5 },
    { name: "Maléfique : Le pouvoir du mal", desc: "Plusieurs années après avoir découvert pourquoi la plus célèbre méchante Disney avait un cœur ...", img: "img/maleficent.jpg", note: 8.2, vote: 3 },
    { name: "Jumanji: The Next Level", desc: "L’équipe est de retour, mais le jeu a changé. Alors qu’ils retournent dans Jumanji pour secourir ...", img: "img/jumanji.jpg", note: 4, vote: 5 },
    { name: "Once Upon a Time... in Hollywood", desc: "En 1969, Rick Dalton – star déclinante d'une série télévisée de western – et Cliff Booth, blah blah blah à hollywood...", img: "img/once_upon.jpg", note: 6, vote: 7 },
    { name: "La Reine des neiges 2", desc: "Elsa, Anna, Kristoff, Olaf et Sven voyagent bien au-delà des portes d’Arendelle à la recherche de réponses ...", img: "img/frozen.jpg", note: 4.6, vote: 3 },
    { name: "Terminator: Dark Fate", desc: "De nos jours à Mexico. Dani Ramos, 21 ans, travaille sur une chaîne de montage dans une usine automobile...", img: "img/terminator.jpg", note: 6.1, vote: 1 },
    { name: "Bad Boy 3", desc: "Baaaaaad Boyyyyys", img: "img/badboy3.jpg", note: 8, vote: 27 }
  ]


  // On va pusher ces données dans un nouveau tableau customisé [movieList], pour les afficher à la chaine.
  // Le push est sous format JSX = JavaScript + XML 
    // JSX = extension de XML
    // XML = extension de HTML

  //<Movie> est une balise custom, représenté par un composant/component Movie.js
  //Les attributs custom sont les 'props', ou propriétés.
  
  ////////////////////////

  // Version avec une for loop :

  // var movieList = []
  // for(var i=0; i<moviesData.length; i ++) {
  //   movieList.push(
  //   <Movie movieName={moviesData[i].name} movieDesc={moviesData[i].desc} movieImg={moviesData[i].img} globalRating={moviesData[i].note} globalCountRating={moviesData[i].vote} />)
  // }
 
  ////////////////////////
 
  // Version avec .map() -> renvoi un tableau automatiquement.
  // Le paramètre element =  moviesData[i] = une ligne {} du tableau

  var movieList = moviesData.map((element, index) =>
    <Movie key={index} movieName={element.name} movieDesc={element.desc} movieImg={element.img} globalRating={element.note} globalCountRating={element.vote} />)

  // Doc: Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity.
  // Doc: When you don’t have stable IDs for rendered items, you may use the item index as a key as a last resort.

  return (

        //style CSS inline en React
    <div style={{ backgroundColor: '#3A3B3C' }}>
      <Container>

        <Navbar color="light" expand="md" light className="me-auto" navbar>
          <NavbarBrand href="/" style={{ color: '#3A3B3C' }}>Latest Movies</NavbarBrand>
          <NavbarBrand href="/">
            <img src="img/logo.png" width="30" height="30"
              className="d-inline-block align-top" alt="logo" />
          </NavbarBrand>
          <Nav className="me-auto" navbar>
            <UncontrolledDropdown inNavbar nav>
              <DropdownToggle caret nav>
                <Button type="button">Wishlist</Button>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Wishlist here
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Navbar>
        
        {/* On injecte le tableau customisé [movieList] 
        dans ces balises JSX sous forme d'objet JavaScript */}
        <Row>
          {movieList}
        </Row>

      </Container>
    </div>

  );
}

export default App;