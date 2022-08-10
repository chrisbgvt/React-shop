import { Table } from 'react-bootstrap';

const OrderTable = ({userOrders}) => {
    return (
        <Table striped bordered hover>
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
    );
}

export default OrderTable;