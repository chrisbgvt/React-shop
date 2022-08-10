import { Container, Row } from 'react-bootstrap';

const Footer = () => {
    return (
        <Container>
            <Row>
                <footer className={'text-center border-top bg-white fixed-bottom footer mt-auto py-3'}>
                    © 2022 Copyright - React Shop
                </footer>
            </Row>
        </Container>
    );
}

export default Footer;