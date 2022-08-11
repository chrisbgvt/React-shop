import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Alert, Button } from 'react-bootstrap';

// import * as productService from '../../services/productService';
import * as cartService from '../../services/cartService';
import * as orderService from '../../services/orderService';
// import { useAuthContext } from '../../contexts/AuthContext';
import { CartContext, useCartContext } from '../../contexts/CartContext';
import CartItem from './CartItem/CartItem';

const Cart = () => {
    // const { user } = useAuthContext();
    const { cart } = useCartContext();
    const [items, setItems] = useState([]);
    const { removeCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [flag, setFlag] = useState({text: '', check: false});

    let order = [];
    let totalPrice = 0;
    items.map(x => order.push(x.title));
    items.map(x => totalPrice += Number(x.price));

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
    }, [cart._id])

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

    return (
        <Container>
            <Row>
                {flag.check && <Alert variant="danger">{flag.text}</Alert>}
                <Button variant="secondary my-3" onClick={() => deleteCartHandler(cart._id)}>Empty cart</Button>
                {items.length > 0 
                    ? items.map(x => 
                        <CartItem key={x._id} product={x} />
                    )
                    : <p>Cart is empty</p>
                }
                <p className={'text-end'}>Total: {totalPrice} lv.</p>
                <Button variant="primary mt-3 mb-5" onClick={() => orderHandler()}>Order</Button>
            </Row>
        </Container>
    );
}

export default Cart;