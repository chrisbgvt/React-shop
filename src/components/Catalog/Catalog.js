import { Container, Row } from 'react-bootstrap';

import CatalogItem from './CatalogItem/CatalogItem';
import Search from './Search/Search';

const Catalog = ({products, search}) => {
    

    return (
        <Container>
            <Row>
                <Search search={search} />
                {products.length > 0
                    ? products.map(x => <CatalogItem key={x._id} product={x} />)
                    : <p>No products found</p>
                }
            </Row>
        </Container>
        
    );
}

export default Catalog;