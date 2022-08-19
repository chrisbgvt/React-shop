import { Pagination } from 'react-bootstrap';

const Paginate = ({ productsPerPage, totalProducts, currentPage, paginate, previous, next }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
      <Pagination className={'d-flex justify-content-center'}>
        <Pagination.Prev disabled={currentPage < 2} onClick={previous} />

        {pageNumbers.map(number => 
            <Pagination.Item key={number} active={number === currentPage} onClick={() => paginate(number)}>
                {number}
            </Pagination.Item>
        )}
  
        <Pagination.Next disabled={currentPage >= (totalProducts / productsPerPage)} onClick={next} />
      </Pagination>
    );
  }
  
  export default Paginate;