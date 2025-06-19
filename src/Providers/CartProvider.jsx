import React, { createContext, use, useEffect, useState } from 'react';
import { AuthContext } from './AuthProvider';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [carts, setCarts] = useState(0);
    const { user } = use(AuthContext);


    // update the cart count by clicking the cart icon
    const updateCartCount = () => {
        setCarts(carts + 1);
    };

    // Effect to fetch cart data when the component mounts
    useEffect(() => {
        const fetchCarts = async () => {
            try {
                const response = await fetch(`https://assignment-11-server-lake-three.vercel.app/myCarts?email=${user?.email}`, {
                    headers: {
                        authorization: `Bearer ${user?.accessToken}`
                    }
                });
                const data = await response.json();
                setCarts(data.length);
            } catch (error) {
                console.error('Error fetching carts:', error);
            }
        };

        if(user){
            fetchCarts();
        }
    }, [user?.email]);


    const cartsData = {
        carts,
        setCarts,
        updateCartCount
    }

    return (
        <CartContext value={cartsData}>
            {children}
        </CartContext>
    );
};

export default CartProvider;