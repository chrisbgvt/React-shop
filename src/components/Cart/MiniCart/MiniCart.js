// import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';

import { useCartContext } from '../../../contexts/CartContext';
import CartItem from '../CartItem/CartItem';

const MiniCart = () => {
    const { cart } = useCartContext();

    let order = [];
    let totalPrice = 0;
    let orderedProducts = [];
    Object.values(cart.products).map(x => order.push(x.title));
    Object.values(cart.products).map(x => totalPrice += Number(x.price));
    Object.values(cart.products).map(x => orderedProducts.push(x));

    return (
        <Container>
            <Row>
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