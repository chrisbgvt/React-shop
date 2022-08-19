import { Container, Row } from 'react-bootstrap';

import CatalogItem from './CatalogItem/CatalogItem';
import Search from './Search/Search';
import Paginate from '../Pagination/Pagination';

const Catalog = ({products, search, productsPerPage, totalProducts, currentPage, paginate, previous, next}) => {
    

    return (
        <Container>
            <Row>
                <Search search={search} />
                {products.length > 0
                    ? products.map(x => <CatalogItem key={x._id} product={x} />)
                    : <p>No products found</p>
                }
                <Paginate 
                    productsPerPage={productsPerPage} 
                    totalProducts={totalProducts} 
                    paginate={paginate} 
                    currentPage={currentPage}
                    previous={previous}
                    next={next}
                 />
            </Row>
        </Container>
        
    );
}

export default Catalog;