import { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';

// import * as productService from '../../services/productService';
import * as cartService from '../../services/cartService';
import * as orderService from '../../services/orderService';
// import { useAuthContext } from '../../contexts/AuthContext';
import { CartContext, useCartContext } from '../../contexts/CartContext';
import CartItem from './CartItem/CartItem';

const ProductDetails = () => {
    // const { user } = useAuthContext();
    const { cart } = useCartContext();
    const [items, setItems] = useState([]);
    const { removeCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [flag, setFlag] = useState({text: '', check: false});

    let order = [];
    let totalPrice = 0;
    items.map(x => (order.push(x.title), totalPrice += Number(x.price)))

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
        
        
        orderService.completeOrder({titles: order, totalPrice})
            .then(result => {
                setFlag(state => ({
                    ...state,
                    text: result.message, 
                    check: true
                }));
                setItems([]);
                removeCart();
            })
            .catch(err => {
                setFlag(state => ({
                    ...state,
                    text: err.error, 
                    check: true
                }));
            });
    }

    return (
        <Container>
            <Row>
                {flag.check && <Alert variant="danger">{flag.text}</Alert>}
                <Button variant="primary" onClick={() => deleteCartHandler(cart._id)}>Empty cart</Button>
                {items.map(x => 
                    <CartItem key={x._id} product={x} />
                )}
                <p className={'text-end'}>Total: {totalPrice} lv.</p>
                <Button variant="primary mt-3" onClick={() => orderHandler()}>Order</Button>
            </Row>
        </Container>
    );
}

export default ProductDetails;