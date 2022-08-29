import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Button, Alert } from 'react-bootstrap';

import * as cartService from '../../../services/cartService';
import { CartContext, useCartContext } from '../../../contexts/CartContext';
import CartItem from '../CartItem/CartItem';

const MiniCart = () => {
    const { cart } = useCartContext();
    const { removeCart } = useContext(CartContext);
    const [flag, setFlag] = useState({text: '', check: false});

    let totalPrice = 0;
    Object.values(cart.products || {}).map(x => totalPrice += Number(x.price));

    const deleteCartHandler = (cartId) => {
        cartService.removeCart(cartId)
            .then(result => {
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
                <Button variant="secondary mb-3 mx-auto mt-auto w-75" onClick={() => deleteCartHandler(cart._id)}>Empty cart</Button>
                {Object.keys(cart).length > 0 
                    ? Object.values(cart.products).map(x => 
                        <CartItem key={x._id} product={x} />
                    )
                    : <p>Cart is empty</p>
                }
                <p className={'text-end mt-4'}>Total: {totalPrice} lv.</p>
                <Link to="/cart" className="btn btn-primary m-auto w-75">Go to cart</Link>
            </Row>
        </Container>
    );
}

export default MiniCart;