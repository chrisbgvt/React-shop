import { Pagination } from 'react-bootstrap';

const Paginate = ({ productsPerPage, totalProducts, currentPage, setCurrentPage }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    const prevChangeHandler = () => {
      setCurrentPage(currentPage => currentPage - 1);
    }

    const changePageHandler = (pageNumber) => {
      setCurrentPage(pageNumber);
    }

    const nextChangeHandler = () => {
      setCurrentPage(currentPage => currentPage + 1);
    }

    return (
      <Pagination className={'d-flex justify-content-center'}>
        <Pagination.Prev disabled={currentPage < 2} onClick={prevChangeHandler} />

        {pageNumbers.map(number => 
            <Pagination.Item key={number} active={number === currentPage} onClick={() => changePageHandler(number)}>
                {number}
            </Pagination.Item>
        )}
  
        <Pagination.Next disabled={currentPage >= (totalProducts / productsPerPage)} onClick={nextChangeHandler} />
      </Pagination>
    );
  }
  
  export default Paginate;