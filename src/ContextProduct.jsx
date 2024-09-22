import React, { createContext, useContext, useState, useEffect } from "react";
import productsList from './assets/products.json';

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {

    const [products, setProducts] = useState(productsList);

    return (
        <ProductContext.Provider
            value={{
            products
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;
