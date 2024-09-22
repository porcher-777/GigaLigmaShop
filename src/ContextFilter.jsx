import React, { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const useFilter = () => useContext(FilterContext);

export const FilterProvider = ({ children }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSortOrder, setSelectedSortOrder] = useState('');

    const filterProductsByCategory = (products) => {
        return selectedCategory ? products.filter(product => product.category === selectedCategory) : products;
    }

    const sortProductsByPrice = (products) => {
        return products.sort((a, b) => selectedSortOrder === 'asc' ? a.price - b.price : b.price - a.price);
    }

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    }

    const handleSortOrderChange = (event) => {
        setSelectedSortOrder(event.target.value);
    }

    return (
        <FilterContext.Provider value={{
            selectedCategory,
            selectedSortOrder,
            setSelectedCategory,
            setSelectedSortOrder,
            filterProductsByCategory,
            sortProductsByPrice,
            handleCategoryChange,
            handleSortOrderChange
        }}>
            {children}
        </FilterContext.Provider>
    );
};
