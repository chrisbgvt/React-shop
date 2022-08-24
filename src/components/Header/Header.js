import { Link } from 'react-router-dom';
import { Container, Nav, Navbar, Badge } from 'react-bootstrap';

import styles from './Header.modules.scss';

import { useAuthContext } from '../../contexts/AuthContext';
import { useCartContext } from '../../contexts/CartContext';

const Header = () => {
    const { user } = useAuthContext();
    const { cart } = useCartContext();

    return (
        <Navbar bg="dark" expand="lg" data-aos="zoom-in">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto mx-auto">
                        <Link className='nav-link text-white' to="/">Home</Link>
                        <Link className='nav-link text-white' to="/catalog">Catalog</Link>

                        {user.token
                            ? <>
                                <Link className='nav-link text-white' to="/create">Create</Link>
                                <Link className={`nav-link text-white cart ${styles}`} to={Object.keys(cart).length > 0 ? '/cart' : '/'}>
                                    Cart
                                    <Badge bg="warning">
                                        {Object.keys(cart).length > 0 && cart.products.length}
                                    </Badge>
                                </Link>
                                <Link className='nav-link text-white' to="/profile">{user.username}</Link>
                                <Link className='nav-link text-white' to="/logout">Logout</Link>
                            </>
                            : <>
                                <Link className='nav-link text-white' to="/login">Login</Link>
                                <Link className='nav-link text-white' to="/register">Register</Link>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;