import { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Image } from 'react-bootstrap';

import styles from './HomePage.modules.scss';

import * as productService from '../../services/productService';
import CatalogItem from '../Catalog/CatalogItem/CatalogItem';

const Home = () => {
    const [newProducts , setNewProducts] = useState([]);
    const [flag, setFlag] = useState({text: '', check: false});

    useEffect(() => {
        productService.getNewest()
            .then(result => {
                setNewProducts(result);
            })
            .catch(err => {
                setFlag(state => ({
                    ...state,
                    text: err.error, 
                    check: true
                }));
            });
    }, []);

    return (
        <div className={`home-page ${styles}`}>
            <section>
                <Container fluid>
                    <Row>
                        <Image src="./imgs/banner.png" width="100%" alt="Banner" className='px-0' />
                    </Row>
                </Container>
            </section>
            <section className='grid-layout'>
                <Container className="py-3">
                    <Row className="py-3">
                        <h2>What we offer</h2>
                    </Row>
                    <Row className="p-3" data-aos="fade-right">
                        <Col className='border-0 rounded shadow p-4'>
                            <i className="fa fa-address-book"></i>
                            <h3>Title 1</h3>
                            <p>
                                Lorem ipsum is simply dummy text of the printing and typesetting industry. 
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                        </Col>
                        <Col className='border-0 rounded shadow p-4'>
                            <i className="fa fa-american-sign-language-interpreting"></i>
                            <h3>Title 2</h3>
                            <p>
                                Lorem ipsum is simply dummy text of the printing and typesetting industry. 
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                        </Col>
                        <Col className='border-0 rounded shadow p-4'>
                            <i className="fa fa-audio-description"></i>
                            <h3>Title 3</h3>
                            <p>
                                Lorem ipsum is simply dummy text of the printing and typesetting industry. 
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                        </Col>
                        <Col className='border-0 rounded shadow p-4'>
                            <i className="fa fa-bank"></i>
                            <h3>Title 4</h3>
                            <p>
                                Lorem ipsum is simply dummy text of the printing and typesetting industry. 
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                        </Col>
                        <Col className='border-0 rounded shadow p-4'>
                            <i className="fa fa-cart-plus"></i>
                            <h3>Title 5</h3>
                            <p>
                                Lorem ipsum is simply dummy text of the printing and typesetting industry. 
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                        </Col>
                        <Col className='border-0 rounded shadow p-4'>
                            <i className="fa fa-cloud-download"></i>
                            <h3>Title 6</h3>
                            <p>
                                Lorem ipsum is simply dummy text of the printing and typesetting industry. 
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className='bg-light'>
                <Container className="py-3">
                    <Row>
                        {flag.check && <Alert variant="danger">{flag.text}</Alert>}
                        <h2 className="py-3">New Products</h2>
                        {newProducts.length > 0
                            ? newProducts.map(x => <CatalogItem key={x._id} product={x} />)
                            : <p>No products found</p>
                        }
                    </Row>
                </Container>
            </section>
            <section>
                <Container className="py-3">
                    <Row className="py-3">
                        <h2>News</h2>
                    </Row>
                    <Row data-aos="fade-right" className='reverse py-4'>
                        <Col md={6} className='d-flex flex-column justify-content-center'>
                            <h4 className='pt-3'>Example Title</h4>
                            <p>
                                Lorem ipsum is simply dummy text of the printing and typesetting industry. 
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                        </Col>
                        <Col md={6}>
                            <Image src="./imgs/customer.png" width="100%" alt="Customer" />
                        </Col>
                    </Row>
                    <Row data-aos="fade-left" className='py-4'>
                        <Col md={6}>
                            <Image src="./imgs/customerhappiness.jpg" width="100%" alt="Customer Happiness" />
                        </Col>
                        <Col md={6} className='d-flex flex-column justify-content-center'>
                            <h4 className='pt-3'>Example Title</h4>
                            <p>
                                Lorem ipsum is simply dummy text of the printing and typesetting industry. 
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
}

export default Home;