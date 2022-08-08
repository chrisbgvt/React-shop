import { Routes, Route } from 'react-router-dom';

import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Catalog from './components/Catalog/Catalog';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Header from './components/Header/Header';
import Logout from './components/Logout/Logout';
import Cart from './components/Cart/Cart';

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Header />

                <div>
                    <Routes>
                        {/* <Route path="/" element={<Home />} /> */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/catalog" element={<Catalog />} />
                        <Route path="/catalog/:productId" element={<ProductDetails />} />
                        <Route path="/cart" element={<Cart />} />
                    </Routes>
                </div>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
