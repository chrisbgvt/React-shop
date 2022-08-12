import { Link } from 'react-router-dom';
import { Card, Col } from 'react-bootstrap';

const CatalogItem = ({product}) => {
    return (
        <Col md={4} className={'py-3'} data-aos="fade-left">
            <Card>
                <Card.Img variant="top" src={product.image} />
                <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>
                        {product.description}
                    </Card.Text>
                    <Card.Text>Price: {product.price} lv.</Card.Text>
                    <Link to={`/catalog/${product._id}`} className="btn btn-primary">Details</Link>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default CatalogItem;