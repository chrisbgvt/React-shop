import { Col, Image } from 'react-bootstrap';

const CartItem = ({product}) => {
    return (
        <Col md={12} className={'d-flex flex-column flex-md-row align-items-center border-bottom py-3 shadow'}>
            <Image className={'col-md-3'} src={product.image} width="100%" height="100%" alt="Product" />
            <p className={'col-md-3 text-center'}>{product.title}</p>
            <p className={'col-md-3 text-center'}>qty: {product.quantity}</p>
            <p className={'col-md-3 text-center'}>Price: {product.price} lv.</p>
        </Col>
    );
}

export default CartItem;