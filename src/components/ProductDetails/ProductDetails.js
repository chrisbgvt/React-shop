import { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Alert, Button, Image } from 'react-bootstrap';

import styles from './ProductDetails.modules.scss';

import * as productService from '../../services/productService';
import * as cartService from '../../services/cartService';
import { useAuthContext } from '../../contexts/AuthContext';
import { CartContext, useCartContext } from '../../contexts/CartContext';
import DeleteModal from '../Modals/DeleteModal';

const ProductDetails = ({deleteHandler}) => {
    const { user } = useAuthContext();
    const { cart } = useCartContext();
    const { userCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [flag, setFlag] = useState({text: '', check: false});
    const [product , setProduct] = useState([]);
    const { productId } = useParams();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
        const { _id, title, image, price } = productData;
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

    const deleteProductHandler = (itemId) => {
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
        <Container className={`my-5 ${styles}`}>
            <Row>
                {flag.check && <Alert variant="danger">{flag.text}</Alert>}
                <DeleteModal close={handleClose} show={show} del={deleteProductHandler} product={product} />
                <Col md={6}>
                    <Image src={product.image} className='mb-4 mb-md-0' width="100%" height="300px" alt="Product" data-aos="fade-right" />
                </Col>
                <Col md={6} className={'d-flex flex-column justify-content-center'}>
                    <h1>{product.title}</h1>
                    <p>{product.description}</p>
                    <p>Price: {product.price} lv.</p>
                    {user.token &&
                        <>
                            {product.quantity < 1 
                            || (Object.keys(cart).length > 0 && Object.values(cart.products).map(x => x.productId === product._id ? (product.quantity - x.quantity) < 1 : false)[0])
                                ? <span className="text-danger">Out of stock</span>
                                : <Button variant="primary" onClick={() => addToCartHandler(product)}>Add to cart</Button>
                            }
                        </>
                    }
                    
                    <Col md={12} className={'d-flex justify-content-between mt-3'}>
                        {user.userRole === 'admin' &&
                            <>
                                <Link to={`/edit/${product._id}`} className="btn btn-primary">Edit</Link>
                                <Button variant="primary" onClick={handleShow}>Delete</Button>
                            </>
                        }
                    </Col>
                </Col>
            </Row>
        </Container>
    );
}

export default ProductDetails;