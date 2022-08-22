import { Link } from 'react-router-dom';
import { Card, Col, Badge } from 'react-bootstrap';
import styles from './CatalogItem.modules.scss';

const CatalogItem = ({product}) => {
    return (
        <Col md={4} className={'py-3'} data-aos="fade-left">
            <Card className={`h-100 border-0 shadow ${styles}`}>
                <Card.Img variant="top" width="100%" height="200px" src={product.image} />
                {product.quantity < 1 &&
                    <Badge bg="danger" className={'m-2 position-absolute'}>Out of stock</Badge>
                }
                <Card.Body className={'d-flex flex-column'}>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>
                        {product.description}
                    </Card.Text>
                    <Card.Text>Price: {product.price} lv.</Card.Text>
                    <Link to={`/catalog/${product._id}`} className="btn btn-primary mt-auto">Details</Link>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default CatalogItem;