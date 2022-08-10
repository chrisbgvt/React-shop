import { useState, useEffect } from 'react';
import { Container, Row, Alert } from 'react-bootstrap';

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
        <>
            <img src="./banner.png" width="100%" alt="Banner"></img>
            <Container>
                <Row>
                    {flag.check && <Alert variant="danger">{flag.text}</Alert>}
                    {newProducts.map(x => <CatalogItem key={x._id} product={x} />) }
                </Row>
            </Container>
        </>
    );
}

export default Home;