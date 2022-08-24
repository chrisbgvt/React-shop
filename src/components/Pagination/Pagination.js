import { Pagination } from 'react-bootstrap';

const Paginate = ({ productsPerPage, totalProducts, currentPage, setCurrentPage }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
      <Pagination className={'d-flex justify-content-center'}>
        <Pagination.Prev disabled={currentPage < 2} onClick={() => setCurrentPage(currentPage => currentPage - 1)} />

        {pageNumbers.map(number => 
            <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
                {number}
            </Pagination.Item>
        )}
  
        <Pagination.Next disabled={currentPage >= (totalProducts / productsPerPage)} onClick={() => setCurrentPage(currentPage => currentPage + 1)} />
      </Pagination>
    );
  }
  
  export default Paginate;