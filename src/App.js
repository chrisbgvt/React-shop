import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './App.scss';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import * as productService from './services/productService';
import { AuthGuard , IsAdminGuard } from './components/Guards/AuthGuard';
import Home from './components/HomePage/HomePage';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Catalog from './components/Catalog/Catalog';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Logout from './components/Logout/Logout';
import Cart from './components/Cart/Cart';
import Create from './components/Create/Create';
import Edit from './components/Edit/Edit';
import Profile from './components/Profile/Profile';
import PageNotFound from './components/PageNotFound/PageNotFound';

function App() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    useEffect(() => {
        productService.getAll()
            .then(result => {
                setProducts(result);
            })
            .catch(err => {
                alert(err);
            })
    }, []);

    const addProductHandler = (product) => {
        setProducts(state => [...state, product]);
    }

    const updateProductHandler = (updatedProduct) => {
        setProducts(state => state.map(x => x._id === updatedProduct._id ? updatedProduct : x));
    }

    const deleteProductHandler = (deletedProductId) => {
        setProducts(state => state.filter(x => x._id !== deletedProductId));
    }

    const searchHandler = (query) => {
        if (query.query === '') {
            productService.getAll()
                .then(result => {
                    setProducts(result);
                })
                .catch(err => {
                    alert(err);
                })
        } else {
            setCurrentPage(1);
            setProducts(state => state.filter(x => x.title.toLowerCase().startsWith(query.query.toLowerCase())));
        }
    }

    const changePageHandler = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const previousHandler = () => {
        setCurrentPage(currentPage => currentPage - 1);
    }

    const nextHandler = () => {
        setCurrentPage(currentPage => currentPage + 1);
    }

    return (
        <AuthProvider>
            <CartProvider>
                <Header />

                <div className={'mb-5'}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/catalog" 
                            element={
                                <Catalog 
                                    products={currentProducts} 
                                    search={searchHandler} 
                                    productsPerPage={itemsPerPage} 
                                    totalProducts={products.length}
                                    currentPage={currentPage}
                                    paginate={changePageHandler}
                                    previous={previousHandler}
                                    next={nextHandler}
                                />
                            } 
                        />
                        <Route path="/catalog/:productId" element={<ProductDetails deleteHandler={deleteProductHandler} />} />
                        <Route element={<AuthGuard />}>
                            <Route path="/logout" element={<Logout />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/profile" element={<Profile />} />
                        </Route>
                        <Route element={<IsAdminGuard />}>
                            <Route path="/create" element={<Create createHandler={addProductHandler} />} />
                            <Route path="/edit/:productId" element={<Edit updateHandler={updateProductHandler} />} />
                        </Route>
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </div>

                <Footer />
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
