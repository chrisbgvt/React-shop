import { useState, useContext } from 'react';
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
    const { removeCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [flag, setFlag] = useState({text: '', check: false});

    let order = [];
    let totalPrice = 0;
    let orderedProducts = [];
    Object.values(cart.products || {}).map(x => order.push(x.title));
    Object.values(cart.products || {}).map(x => totalPrice += Number(x.price));
    Object.values(cart.products || {}).map(x => orderedProducts.push(x));

    const deleteCartHandler = (cartId) => {
        cartService.removeCart(cartId)
            .then(result => {
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
        
        
        orderService.completeOrder({titles: order, totalPrice, products: orderedProducts})
            .then(result => {
                setFlag(state => ({
                    ...state,
                    text: result.message, 
                    check: true
                }));
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
                {Object.keys(cart).length > 0 
                    ? Object.values(cart.products).map(x => 
                        <CartItem key={x._id} product={x} />
                    )
                    : <p>Cart is empty</p>
                }
                <p className={'text-end mt-4'}>Total: {totalPrice} lv.</p>
                <Button variant="primary mt-3 mb-5" onClick={() => orderHandler()}>Order</Button>
            </Row>
        </Container>
    );
}

export default Cart;