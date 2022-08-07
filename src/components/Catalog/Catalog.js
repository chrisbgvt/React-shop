import { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';

import * as productService from '../../services/productService';
import CatalogItem from './CatalogItem/CatalogItem';

const Catalog = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        productService.getAll()
            .then(result => {
                setProducts(result);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <Container>
            <Row>
                { products.map(x => <CatalogItem key={x._id} product={x} />) }
            </Row>
        </Container>
        
    );
}

export default Catalog;