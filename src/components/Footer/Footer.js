import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className={'footer mt-auto'}>
            <section className='py-5 bg-light'>
                <Container className='py-5'>
                    <Row className='p-3'>
                        <Col md={4}>
                            <h4 className='pt-3'>About us</h4>
                            <p>
                                Lorem ipsum is simply dummy text of the printing and typesetting industry. 
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                        </Col>
                        <Col md={4}>
                            <h4 className='pt-3'>Contact</h4>
                            <p className='mb-0'>Country, City</p>
                            <p className='mb-0'>Street</p>
                            <p>18616</p>
                            <div className='border-top pt-3'>
                                <i className="fa fa-phone"></i>
                                <a href="tel:+5637567568" style={{ textDecoration: 'none', paddingLeft: '.5rem' }}>+5637567568</a>
                            </div>
                            <div>
                                <i className="fa fa-envelope"></i>
                                <a href="mailto:info@test.co" style={{ textDecoration: 'none', paddingLeft: '.5rem' }}>info@test.co</a>
                            </div>
                        </Col>
                        <Col md={4}>
                            <h4 className='pt-3'>Socials</h4>
                            <i className="fa fa-facebook-f" style={{ paddingRight: '.3rem' }}></i>
                            <i className="fa fa-instagram"></i>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section>
                <Container fluid>
                    <Row>
                        <Col className={'text-center text-white border-top bg-dark py-3'}>
                            © 2022 Copyright - React Shop
                        </Col>
                    </Row>
                </Container>
            </section>
        </footer>
    );
}

export default Footer;