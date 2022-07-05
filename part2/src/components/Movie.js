import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Col, Card, CardBody, CardTitle, CardText,
         CardImg, Button, Badge, ButtonGroup} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faPhotoFilm, faStar } from '@fortawesome/free-solid-svg-icons'

// props = les propriétés, ou attributs html custom dans <Movie>, dans App.js
function Movie(props) {

  // useState pour modifier les états des : Number, Boolean, String etc...
  // La fonction useState à droite, retourne 2 paramètres, que l'on écrit à gauche ^_^'
  // On écrit le state initial dans useState : false, 0, ''
 
  const [likeMovie, setLikeMovie] = useState(false)
  const [countWatchMovie, setCountWatchMovie] = useState(0)
  const [myRatingMovie, setMyRatingMovie] = useState(0)
  // C'est la même technique qu'ouvrir un tableau vide, ou écrire une variable à 0, pour l'utiliser et la modifier plus tard.


  //// Changement de la couleur du coeur ////
      //On change likeMovie de false à true directement dans le onClick
  var likeColor;
  if (likeMovie) {
    likeColor = { color: '#e74c3c', cursor: 'pointer' }
  } else {
    likeColor = { color: '#5A4C1C', cursor: 'pointer' }
  }

  //// Condition pour limiter les myRatingMovie de 0 à 10 ////
    // on fait passer le paramètre ratingLimit dans la function de useState : setMyRatingMovie, et la valeur, ou l'argument de ce paramètre, est dans le onClick des <Button> de 'My Rating'
  var handleLimitRating = (ratingLimit) => {
    if(ratingLimit < 0) {
      ratingLimit = 0;
    } else if (ratingLimit > 10) {
      ratingLimit = 10
    }
    setMyRatingMovie(ratingLimit)

    // On rajoute cette instruction pour le calcul de la moyenne. Dès qu'on vote, on active le if statement dans 'Calculer la nouvelle moyenne', et le rajout +1 de notre vote.
    setIsRatingMovie(true)
  }

  //// Push des étoiles noires ou jaunes dans : My Rating ////
  var starsMyRating = []
  for (let i = 0; i < 10; i++) {
    let color = { cursor: 'pointer' }
    if (i < myRatingMovie) {
       color = { color: '#f1c40f', cursor: 'pointer' }
    }
    let indexCount = i + 1 //car i commence à 0, et on veut mettre 1 étoile minimum.
    starsMyRating.push(
    <FontAwesomeIcon onClick={() => handleLimitRating(indexCount)} style={color} icon={faStar} />)
                  // Pour pouvoir cliquer directement sur une étoile, nouveau onClick.
  }

  //// Calculer la nouvelle moyenne ////
  var nbTotalNote = props.globalRating * props.globalCountRating
  var nbTotalVote = props.globalCountRating

    // Technique classique : créer un boolean à false, pour l'utiliser d'une manière qu'on veut. 
    // le 'false' est transformé à 'true' dans la fonction handleLimitRating, qui s'active dès qu'on vote
  const [isRatingMovie, setIsRatingMovie ] = useState(false)
  
  if(isRatingMovie) {
    nbTotalNote = nbTotalNote + myRatingMovie
    nbTotalVote += 1
  }
  var updatedScore = Math.round(nbTotalNote/nbTotalVote)
    //console.log(updatedScore)

  //// Push des étoiles noires ou jaunes dans : Global Rating ////
      // (Cette instruction était en haut, mais on la déplace en bas pour qu'elle prenne en compte le updatedScore, sinon...ça marche pas >_<)
  var starsGlobalRating = []
  for (let i = 0; i < 10; i++) {
    let color = {};
    // On change props.globalRating avec updatedScore
    if (i < updatedScore) {
      color = { color: '#f1c40f' }
    }
    starsGlobalRating.push(<FontAwesomeIcon style={color} icon={faStar}/>)
  }

  //// CSS Extra de Gauthier ////

  // cardBorder à rajouter dans Card
  var cardBorder = {
    borderRadius : 10,
    boxShadow: '8px 4px 20px #101010',
    marginBottom: 10, 
    marginTop: 10
  }

  // imgBorder à rajouter dans CardImg
  var imgBorder = {
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      borderBottomRadius : 0 
  }

  return (

    <Col xs="12" lg="6" xl="4">
      <Card className="card" style={cardBorder}>
        <CardImg style={imgBorder} src={props.movieImg} alt={props.movieName} top width="100%" />
        <CardBody>
          <p>Like {' '}
            <FontAwesomeIcon style={likeColor} icon={faHeart}
              onClick={() => setLikeMovie(!likeMovie)} /></p>

          <p>Watched {' '}{' '}
            <FontAwesomeIcon icon={faPhotoFilm} 
              style={{color: '#f1a40f', cursor: 'pointer', userSelect: "none" }}
              onClick={() => setCountWatchMovie(countWatchMovie + 1)} />{' '}
            <Badge color="secondary">{countWatchMovie}</Badge>{' '}
            times.</p>

          <p>My Rating {' '}
            {starsMyRating} {' '}
            <ButtonGroup size="sm">
              <Button color="secondary" onClick={() => handleLimitRating(myRatingMovie -1)}>-</Button>
              <Button color="secondary" onClick={() => handleLimitRating(myRatingMovie +1)}>+</Button>
            </ButtonGroup>
            {/* {myRatingMovie} */}
            {/* Equivalent console.log dans JSX*/}
          </p>

          <p>Global Rating {' '}
            {starsGlobalRating} {' '}
            ({nbTotalVote})
          </p>
          <CardTitle tag="h5">{props.movieName}</CardTitle>
          <CardText>{props.movieDesc}</CardText>
        </CardBody>
      </Card>
    </Col>

  );
}

export default Movie;