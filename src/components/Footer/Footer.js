import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <>
            <section className='py-4 bg-light'>
                <Container>
                    <Row>
                        <Col md={6}>
                            <h4 className='pt-3'>About us</h4>
                            <p>
                                Lorem ipsum is simply dummy text of the printing and typesetting industry. 
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                        </Col>
                        <Col md={6}>
                            <h4 className='pt-3'>Example Title</h4>
                            <div>
                                <i class="fa fa-phone"></i>
                                <a href="tel:+5637567568" style={{ textDecoration: 'none', paddingLeft: '.5rem' }}>+5637567568</a>
                            </div>
                            <div>
                                <i class="fa fa-envelope"></i>
                                <a href="mailto:info@test.co" style={{ textDecoration: 'none', paddingLeft: '.5rem' }}>info@test.co</a>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section>
                <Container fluid>
                    <Row>
                        <footer className={'text-center text-white border-top bg-dark footer mt-auto py-3'}>
                            © 2022 Copyright - React Shop
                        </footer>
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default Footer;