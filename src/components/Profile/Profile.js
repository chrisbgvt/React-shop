import { useState, useEffect } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';

import * as orderService from '../../services/orderService';
import { useAuthContext } from '../../contexts/AuthContext';
import OrderTable from './OrderTable/OrderTable';

const Profile = () => {
    const [orders , setOrders] = useState([]);
    const [flag, setFlag] = useState({text: '', check: false});
    const { user } = useAuthContext();

    useEffect(() => {
        orderService.getUserOrders(user.userId)
            .then(result => {
                setOrders(result);
            })
            .catch(err => {
                setFlag(state => ({
                    ...state,
                    text: err.error, 
                    check: true
                }));
            });
    }, [user.userId]);

    return (
        <Container>
            <Row>
                {flag.check && <Alert variant="danger">{flag.text}</Alert>}
                <Col md={12} className={'my-3'}>
                    <h1 className={'text-center'}>{user.username}</h1>
                    <p className={'text-center'}>Role: {user.userRole}</p>
                    <h4 className={'text-center'}>Orders Table</h4>
                    <div className={'d-flex flex-column justify-content-center align-items-center'}>
                        <OrderTable userOrders={orders} />
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Profile;