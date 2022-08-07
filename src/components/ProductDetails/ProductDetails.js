import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import * as productService from '../../services/productService';

const ProductDetails = () => {
    const [product , setProduct] = useState([]);
    const { productId } = useParams();

    useEffect(() => {
        productService.getOne(productId)
            .then(result => {
                setProduct(result);
            })
            .catch(err => {
                console.log(err);
            });
    }, [productId])

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <img src={product.image} width="100%" alt="Product" />
                </Col>
                <Col md={6} className={'d-flex flex-column justify-content-center'}>
                    <h1>{product.title}</h1>
                    <p>{product.description}</p>
                    <p>Price: {product.price} lv.</p>
                </Col>
            </Row>
        </Container>
    );
}

export default ProductDetails;