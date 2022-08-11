import { Container, Row } from 'react-bootstrap';

import CatalogItem from './CatalogItem/CatalogItem';

const Catalog = ({products}) => {
    

    return (
        <Container>
            <Row>
                {products.length > 0
                    ? products.map(x => <CatalogItem key={x._id} product={x} />)
                    : <p>No products found</p>
                }
            </Row>
        </Container>
        
    );
}

export default Catalog;