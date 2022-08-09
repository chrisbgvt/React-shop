import { Container, Row } from 'react-bootstrap';

import CatalogItem from './CatalogItem/CatalogItem';

const Catalog = ({products}) => {
    

    return (
        <Container>
            <Row>
                { products.map(x => <CatalogItem key={x._id} product={x} />) }
            </Row>
        </Container>
        
    );
}

export default Catalog;