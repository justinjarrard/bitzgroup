import Jumbotron from '../../components/Jumbotron'
import {
  Container,
  Row,
  Col
} from 'reactstrap'


const Home = () => {
  return (
    <>
      <Container>
        <Row>
          <Col xs='12'>
            <Jumbotron />
          </Col>
        </Row>
        <Row>
        </Row>
      </Container>
    </>
  )
}

export default Home