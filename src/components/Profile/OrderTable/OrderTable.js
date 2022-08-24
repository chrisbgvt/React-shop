import { Table } from 'react-bootstrap';
import Paginate from '../../Pagination/Pagination';

const OrderTable = ({userOrders, ordersPerPage, totalOrders, currentPage, setCurrentPage}) => {
    return (
        <>
            <Table striped bordered hover data-aos="fade-up">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Ordered products</th>
                        <th>Total price</th>
                    </tr>
                </thead>
                <tbody>
                    {userOrders.map((x, index) => 
                        <tr key={x._id}>
                            <td>{index + 1}</td>
                            <td>{x.titles.join(', ')}</td>
                            <td>{x.totalPrice} lv.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Paginate 
                productsPerPage={ordersPerPage} 
                totalProducts={totalOrders}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </>
    );
}

export default OrderTable;