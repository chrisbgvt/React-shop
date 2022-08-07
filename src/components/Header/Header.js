import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';

import { useAuthContext } from '../../contexts/AuthContext';

const Header = () => {
    const { user } = useAuthContext();

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link className='nav-link' to="/">Home</Link>
                        <Link className='nav-link' to="/catalog">Catalog</Link>

                        {user.token
                            ? <>
                                <Link className='nav-link' to="/logout">Logout</Link>
                            </>
                            : <>
                                <Link className='nav-link' to="/login">Login</Link>
                                <Link className='nav-link' to="/register">Register</Link>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;