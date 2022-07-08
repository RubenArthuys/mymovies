import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Container, Row, Button, DropdownToggle, ListGroupItem, 
         NavbarBrand, Navbar, Popover, PopoverHeader, PopoverBody, ListGroup, CardImg} from 'reactstrap';
import Movie from './components/Movie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm } from '@fortawesome/free-solid-svg-icons'



function App() {

  //// Compteur de films + tableau wishList ////
  const [moviesCount, setMoviesCount] = useState(0)
  const [moviesWishList, setMoviesWishList] = useState([])
  

  // Copie depuis la doc reactstrap pour le Popover
  const [popoverOpen, setPopoverOpen] = useState(false);
  const toggle = () => setPopoverOpen(!popoverOpen);
  

  //// Interroger le backend ////

  // Nouveau tableau des données principales
  const [movieListMDB, setMovieListMDB] = useState([])

  useEffect(() => {

    async function loadData() {
      // Chargement des films depuis le backend
      const response = await fetch('/new-movies')
      const jsonResponse = await response.json()
            //  console.log(jsonResponse)
      setMovieListMDB(jsonResponse.moviesFromAPI)


      // Charger les films au démarrage de l'app dans la wishList
      const loadWishlist = await fetch('wishlist-movie')
      const loadWishlistJSON = await loadWishlist.json()
      const moviesForWishList = loadWishlistJSON.movieListFromBackend
            // console.log(loadWishlistJSON)

      const wishlistMDB = moviesForWishList.map((element) => 
        ({name: element.movieName, img: element.movieImg}
      ));
      setMoviesWishList(wishlistMDB)
      setMoviesCount(moviesForWishList.length)
    }
    loadData();
    
  }, [])
  // https://developer.mozilla.org/en-US/docs/Web/API/Response/json
  
  //// Fonction rajout de films dans moviesWishList ////
  var handleClickAddMovie = async (name, img) => {
    setMoviesWishList([...moviesWishList, { name: name, img: img}])
    setMoviesCount(moviesCount + 1)
 
    // ajouter le film en base de donnée grâce à notre webservice :
    await fetch('/wishlist-movie', {
      method : 'POST',
      headers : {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `name=${name}&img=${img}`
    })
  }
  // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  
  //// Fonction delete de films dans moviesWishList ////
  var handleClickDeleteMovie = async (deleteMovie) => {
    //console.log(deleteMovie)
    setMoviesWishList(moviesWishList.filter((element)=>(element.name !== deleteMovie)))
    setMoviesCount(moviesCount - 1)

    // delete le film en base de donnée grâce à notre webservice :
    await fetch(`/wishlist-movie/${deleteMovie}`, {
      method : 'DELETE',
    })
  }
 
  //// Push moviesWishList dans le Popover ////
  var cardWish = moviesWishList.map((element, index) => 
    <ListGroupItem key={index} onClick={() => handleClickDeleteMovie(element.name)}>
      <CardImg src={element.img} alt="hi" width="25%" />
      <span> {element.name}</span>
    </ListGroupItem>)
       // console.log(cardWish)
  

  //// Movie cards principales, dans nouveau tableau movieList ////
  var movieList = movieListMDB.map((element, index) => {
    
    // Transforme le push avec props 'movieSeen' -> remplace le state 'likeMovie' dans Movie.js 
    var result = moviesWishList.find(elementFind => elementFind.name === element.title)
    var seenMovie = true
    if(result === undefined) {
      seenMovie = false
    }

    //Limiter le nb de charactères description à 80
    var result = element.overview
    if(result.length > 80) {
      result = result.slice(0,80)+"..."
    }

    return(
      <Movie key={index} movieSeen={seenMovie} movieName={element.title} 
      movieDesc={element.overview} movieImg={'https://image.tmdb.org/t/p/w500/' + element.backdrop_path} 
      globalRating={element.vote_average} globalCountRating={element.vote_count} 
      handleClickAddMovieParent={handleClickAddMovie} 
      handleClickDeleteMovieParent={handleClickDeleteMovie}/>
    )
  })
    
    
  return (

    <div style={{ backgroundColor: '#5A5B5C' }}>
      <Container>

        <Navbar color="light" expand="md" light className="me-auto rounded-bottom" navbar sticky="top">
          <NavbarBrand style={{ color: '#3A3B3C' }}> Latest Movies</NavbarBrand>
          <NavbarBrand>
            <FontAwesomeIcon style={{ height: "44px", color: '#3A3B3C' }} icon={faFilm} />
          </NavbarBrand>

          <Nav className="me-auto" navbar>
            {/* <FontAwesomeIcon style={ {height: "40px"} } icon={faFilm} /> */}
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