import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <Container>
            <Row>
                <footer className={'text-center border-top footer mt-auto py-3'}>
                    Copyright 2022
                </footer>
            </Row>
        </Container>
    );
}

export default Footer;