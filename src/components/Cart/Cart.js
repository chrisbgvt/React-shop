import { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';

// import * as productService from '../../services/productService';
import * as cartService from '../../services/cartService';
// import { useAuthContext } from '../../contexts/AuthContext';
import { CartContext, useCartContext } from '../../contexts/CartContext';

const ProductDetails = () => {
    // const { user } = useAuthContext();
    const { cart } = useCartContext();
    const [items, setItems] = useState([]);
    const { removeCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [flag, setFlag] = useState({text: '', check: false});

    useEffect(() => {
        cartService.getOne(cart._id)
            .then(result => {
                setItems(state => [...state, ...result.products]);
            })
            .catch(err => {
                setFlag(state => ({
                    ...state,
                    text: err.error, 
                    check: true
                }));
            });
    }, [])

    const deleteCartHandler = (cartId) => {
        cartService.removeCart(cartId)
            .then(result => {
                setItems([]);
                removeCart();
                navigate('/catalog');
            })
            .catch(err => {
                setFlag(state => ({
                    ...state,
                    text: err.error, 
                    check: true
                }));
            });
    }

    const orderHandler = () => {
        
    }

    return (
        <Container>
            <Row>
                {flag.check && <Alert variant="danger">{flag.text}</Alert>}
                {items.map(x => 
                    <Col key={x._id} md={12} className={'d-flex'}>
                        <img src={x.image} />
                        <p>{x.title}</p>
                        <p>Price: {x.price} lv.</p>
                    </Col>
                )}
                <Button variant="primary" onClick={() => deleteCartHandler(cart._id)}>Empty cart</Button>
            </Row>
            <Button variant="primary" onClick={() => orderHandler()}>Order</Button>
        </Container>
    );
}

export default ProductDetails;