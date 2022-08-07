import { Routes, Route } from 'react-router-dom';

import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login/Login';
import Catalog from './components/Catalog/Catalog';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Header from './components/Header/Header';
import Logout from './components/Logout/Logout';

function App() {
    return (
        <AuthProvider>
            <Header />

            <div>
                <Routes>
                    {/* <Route path="/" element={<Home />} /> */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/catalog/:productId" element={<ProductDetails />} />
                </Routes>
            </div>
        </AuthProvider>
    );
}

export default App;
