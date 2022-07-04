import '../App.css';
import { Col, Card, CardBody, CardTitle, CardText, 
         CardImg, Button, Badge, ButtonGroup } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faStar, faPhotoFilm } from '@fortawesome/free-solid-svg-icons'

// props = les propriétés, ou attributs html custom dans <Movie>, dans App.js
function Movie(props) {

  // Pour pusher des étoiles jaunes dans : Global Rating
  var starsGlobalRating = []
  for (var i = 0; i < 10; i++) {

    var color = {}
    if (i < props.globalRating) {
      color = { color: '#f1c40f' }
    }
    
    starsGlobalRating.push(<FontAwesomeIcon style={color} icon={faStar} />)
  }

  return (

    <Col xs="12" lg="6" xl="4">
      <Card style={{marginBottom:10, marginTop:10}}>
        <CardImg src={props.movieImg} alt={props.movieName} top width="100%" />
        <CardBody>
          <p>Like {' '}
            <FontAwesomeIcon style={{ color: '#5A4C1C', cursor: 'pointer' }} icon={faHeart} /></p>
          <p>Nombre de vues {' '}
            <FontAwesomeIcon icon={faPhotoFilm} style={{color: '#f1a40f', cursor: 'pointer'}} /> {' '}
            <Badge color="secondary"> 2 </Badge></p>
          <p>
            Mon avis {' '}
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} /> {' '}
            <ButtonGroup size="sm">
              <Button color="secondary">-</Button>
              <Button color="secondary">+</Button>
            </ButtonGroup>
          </p>
          <p>
            Moyenne {' '}
            {starsGlobalRating}
            ({props.globalCountRating})
          </p>
          <CardTitle tag="h5">{props.movieName}</CardTitle>
          <CardText>{props.movieDesc}</CardText>
        </CardBody>
      </Card>
    </Col>

  );
}

export default Movie;