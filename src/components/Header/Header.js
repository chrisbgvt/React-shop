import { Link } from 'react-router-dom';
import { Container, Nav, Navbar, Badge, NavDropdown, Image } from 'react-bootstrap';

import styles from './Header.modules.scss';

import MiniCart from '../Cart/MiniCart/MiniCart';
import { useAuthContext } from '../../contexts/AuthContext';
import { useCartContext } from '../../contexts/CartContext';

const Header = () => {
    const { user } = useAuthContext();
    const { cart } = useCartContext();

    const navDropdownTitle = (
        <>
            <Image src="./imgs/shopping-cart.png" width="25px" height="25px" alt="Cart" />
            <Badge bg="warning">
                {Object.keys(cart).length > 0 && cart.products.length}
            </Badge>
        </>
    );

    return (
        <Navbar bg="dark" className={styles} expand="lg" data-aos="zoom-in">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto mx-auto">
                        <Link className='nav-link text-white' to="/">Home</Link>
                        <Link className='nav-link text-white' to="/catalog">Catalog</Link>
                        <Link className='nav-link text-white' to="/contact">Contact</Link>

                        {user.token
                            ? <>
                                <Link className='nav-link text-white' to="/create">Create</Link>
                                <NavDropdown title={navDropdownTitle} className='text-white cart' id="navbarScrollingDropdown">
                                    {Object.keys(cart).length > 0
                                        ? <MiniCart />
                                        : <p className='d-flex justify-content-center align-items-center mb-0'>Cart is empty</p>
                                    }
                                </NavDropdown>
                                <NavDropdown title={user.username} className='text-white profile' id="navbarScrollingDropdown2">
                                    <Link className='nav-link d-flex justify-content-center align-items-center' to="/profile">
                                        Profile
                                    </Link>
                                    <Link className='nav-link d-flex justify-content-center align-items-center' to="/logout">
                                        Logout
                                    </Link>
                                </NavDropdown>
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