import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Col, Card, CardBody, CardTitle, CardText,
         CardImg, Button, Badge, ButtonGroup} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faPhotoFilm, faStar } from '@fortawesome/free-solid-svg-icons'

function Movie(props) {
 
  ////////////// Day 3 ////////////////

  //// Mise en place du compteur de films ////
  var handleClickLike = (name, img) => {
      // setLikeMovie(!likeMovie) 
    
      // On remplace le state boolean 'likeMovie' par la nouvelle props : movieSeen, aussi un boolean. 
      // Un conditionel attend un boolean, peu importe qu'il vienne d'un state (local) ou une props (parent).
    if(!props.movieSeen) {
      //if movieSeen = false
      props.handleClickAddMovieParent(name, img)
    } else {
      props.handleClickDeleteMovieParent(name)
    }
  }

  ///////// DAY 2 //////////
  
  // On remplace le useState likeMovie par la nouvelle props : movieIsNotSeen
  // [likeMovie, setLikeMovie] = useState(false)

  const [countWatchMovie, setCountWatchMovie] = useState(0)
  const [myRatingMovie, setMyRatingMovie] = useState(0)

  //// Changement de la couleur du coeur ////
  var likeColor;
      // On remplace le state boolean 'likeMovie' par la nouvelle props : movieIsNotSeen
  if (props.movieSeen) {
    //if movieSeen = true
    likeColor = { color: '#e74c3c', cursor: 'pointer' }
  } else {
    likeColor = { color: '#5A4C1C', cursor: 'pointer' }
  }

  //// Condition pour limiter les myRatingMovie de 0 à 10 ////
  var handleLimitRating = (ratingLimit) => {
    if(ratingLimit < 0) {
      ratingLimit = 0;
    } else if (ratingLimit > 10) {
      ratingLimit = 10
    }
    setMyRatingMovie(ratingLimit)
    // On rajoute ça ici pour le nouveau calcul de la moyenne :
    setIsRatingMovie(true)
  }

  //// Push des étoiles noires ou jaunes dans : My Rating ////
  var starsMyRating = []
  for (let i = 0; i < 10; i++) {
    var color = { cursor: 'pointer' }
    if (i < myRatingMovie) {
       color = { color: '#f1c40f', cursor: 'pointer' }
    }
    let indexCount = i + 1
    starsMyRating.push(
    <FontAwesomeIcon onClick={() => handleLimitRating(indexCount)} style={color} icon={faStar} />)
  }

  //// Calculer la nouvelle moyenne ////
  var nbTotalNote = props.globalRating * props.globalCountRating
  var nbTotalVote = props.globalCountRating

  const [isRatingMovie, setIsRatingMovie ] = useState(false)
  
  if(isRatingMovie) {
    nbTotalNote = nbTotalNote + myRatingMovie
    nbTotalVote += 1
  }
  var updatedScore = Math.round(nbTotalNote/nbTotalVote)
    //console.log(updatedScore)


  //////////// DAY 1 ////////////
  
  //// Push des étoiles noires ou jaunes dans : Global Rating ////
  var starsGlobalRating = []
  for (var i = 0; i < 10; i++) {
    var colorGlobal = {};
    // On change props.globalRating avec updatedScore
    if (i < updatedScore) {
      colorGlobal = { color: '#f1c40f' }
    }
    starsGlobalRating.push(<FontAwesomeIcon style={colorGlobal} icon={faStar}/>)
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
              onClick={() => handleClickLike(props.movieName, props.movieImg) } /></p>

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
          </p>

          <p>Global Rating {' '}
            {starsGlobalRating} {' '}
            ({nbTotalVote})
          </p>
          <CardTitle tag="h5" style={{ fontWeight: 'bold' }}>{props.movieName}</CardTitle>
          <CardText>{props.movieDesc}</CardText>
        </CardBody>
      </Card>
    </Col>

  );
}

export default Movie;