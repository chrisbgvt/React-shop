import { createContext, useContext, useState } from "react";
// import { useLocalStorage } from "../hooks/useLocalStorage";

export const CartContext = createContext();

export const CartProvider = ({
    children,
}) => {
    // const [auth, setAuth] = useLocalStorage('auth', {});
    const [cart, setCart] = useState({})

    const userCart = (cartData) => {
        setCart(cartData);
    };

    const removeCart = () => {
        setCart({});
    };

    return (
        <CartContext.Provider value={{
            cart,
            userCart,
            removeCart
        }}>
            {children}
        </CartContext.Provider>  
    );
};

export const useCartContext = () => {
    const context = useContext(CartContext);

    return context;
};