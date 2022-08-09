import { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';

import * as productService from '../../services/productService';
import * as cartService from '../../services/cartService';
import { useAuthContext } from '../../contexts/AuthContext';
import { CartContext, useCartContext } from '../../contexts/CartContext';

const ProductDetails = ({deleteHandler}) => {
    const { user } = useAuthContext();
    const { cart } = useCartContext();
    const { userCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [flag, setFlag] = useState({text: '', check: false});
    const [product , setProduct] = useState([]);
    const { productId } = useParams();

    useEffect(() => {
        productService.getOne(productId)
            .then(result => {
                setProduct(result);
            })
            .catch(err => {
                setFlag(state => ({
                    ...state,
                    text: err.error, 
                    check: true
                }));
            });
    }, [productId])

    const addToCartHandler = (productData) => {
        const { _id, title, image, price, quantity } = productData;
        const product = {
            products: [
                {
                    productId: _id,
                    title,
                    image,
                    price,
                    quantity: 1
                }
            ]
        }
        const query = Object.keys(cart).length < 1 ? cartService.addToCart(product) : cartService.updateCart(product);

        query
            .then(result => {
                userCart(result)
                navigate('/cart');
            })
            .catch(err => {
                setFlag(state => ({
                    ...state,
                    text: err, 
                    check: true
                }));
            })
    }

    const deleteProducttHandler = (itemId) => {
        productService.remove(itemId)
            .then(result => {
                deleteHandler(result);
                navigate('/catalog');
            })
            .catch(err => {
                setFlag(state => ({
                    ...state,
                    text: err, 
                    check: true
                }));
            })
    }

    return (
        <Container>
            <Row>
                {flag.check && <Alert variant="danger">{flag.text}</Alert>}
                <Col md={6}>
                    <img src={product.image} width="100%" alt="Product" />
                </Col>
                <Col md={6} className={'d-flex flex-column justify-content-center'}>
                    <h1>{product.title}</h1>
                    <p>{product.description}</p>
                    <p>Price: {product.price} lv.</p>
                    {user.token &&
                        <>
                            {product.quantity === 0
                                ? <span class="text-danger">Out of stock</span>
                                : <Button variant="primary" onClick={() => addToCartHandler(product)}>Add to cart</Button>
                            }
                        </>
                        
                        // <Link to={'/cart'} className="btn btn-primary" onClick={() => addToCartHandler(product)}>Add to cart</Link>
                    }
                    
                    <Col md={12} className={'d-flex justify-content-between mt-3'}>
                        {user.userRole === 'admin' &&
                            <>
                                <Link to={`/edit/${product._id}`} className="btn btn-primary">Edit</Link>
                                <Button variant="primary" onClick={() => deleteProducttHandler(productId)}>Delete</Button>
                            </>
                        }
                    </Col>
                </Col>
            </Row>
        </Container>
    );
}

export default ProductDetails;