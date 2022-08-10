import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const PageNotFound = () => {
    return (
        <Container>
            <Row>
                <Col md={12}>
                    <div className={'d-flex flex-column justify-content-center align-items-center'}>
                        <h2>404 Page not found</h2>
                        <Link className='btn btn-primary' to="/">Return to home</Link>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default PageNotFound;