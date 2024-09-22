import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartState, setCartState] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState('');
  const [subPrice, setSubPrice] = useState(0);
  const [oldPrice, setOldPrice] = useState(0);
  const [newPrice, setNewPrice] = useState(0);

  const addToCart = (productsToAdd) => {
    setCartItems((prevItems) => {
      return productsToAdd.reduce((cart, newItem) => {
        const existingItemIndex = cart.findIndex(item => item.product.id === newItem.product.id);
  
        if (newItem.product.category === 'smartphones') {
          const discountPrice = newItem.product.price - (newItem.product.price * (newItem.product.discountPercentage / 100));
          if (existingItemIndex > -1) {
            const updatedItem = {
              ...cart[existingItemIndex],
              quantity: cart[existingItemIndex].quantity + newItem.quantity,
              subPrice: (cart[existingItemIndex].quantity + newItem.quantity) * discountPrice,
              oldPrice: newItem.product.price,
              newPrice: discountPrice
            };
            return [...cart.slice(0, existingItemIndex), updatedItem, ...cart.slice(existingItemIndex + 1)];
          } else {
            return [...cart, {
              product: newItem.product,
              quantity: newItem.quantity,
              subPrice: newItem.quantity * discountPrice,
              oldPrice: newItem.product.price,
              newPrice: discountPrice
            }];
          }
          
        } else {
          if (existingItemIndex > -1) {
            const updatedItem = {
              ...cart[existingItemIndex],
              quantity: cart[existingItemIndex].quantity + newItem.quantity,
              subPrice: (cart[existingItemIndex].quantity + newItem.quantity) * newItem.product.price,
              oldPrice: newItem.product.price,
              newPrice: newItem.product.price
            };
            return [...cart.slice(0, existingItemIndex), updatedItem, ...cart.slice(existingItemIndex + 1)];
          } else {
            return [...cart, {
              product: newItem.product,
              quantity: newItem.quantity,
              subPrice: newItem.quantity * newItem.product.price,
              oldPrice: newItem.product.price,
              newPrice: newItem.product.price
            }];
          }
        }
      }, prevItems);
    });
  };
  

  const removeFromCart = (itemToRemove) => {
    if (!itemToRemove || !itemToRemove.product) {
      console.error('Invalid itemToRemove:', itemToRemove);
      return;
    }

    setCartItems((prevItems) => {
      const index = prevItems.findIndex(item => item.product.id === itemToRemove.product.id);

      if (index === -1) {
        console.warn('Item not found in cart:', itemToRemove);
        return prevItems;
      }

      const updatedItems = [...prevItems];
      updatedItems.splice(index, 1);
      return updatedItems;
    });
  };

  const applyOffer = () => {
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.product.category === 'smartphones' ? {
          ...item,
          product: {
            ...item.product,
            price: item.product.price * (1 - item.product.discountPercentage / 100)
          },
          subPrice: item.quantity * item.product.price * (1 - item.product.discountPercentage / 100)
        } : item
      )
    );
  };  

  const upProductQuantity = (item) => {
    setCartItems((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem.product.id === item.product.id && cartItem.quantity < cartItem.product.stock
          ? {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            subPrice: (cartItem.quantity + 1) * cartItem.newPrice
          }
          : cartItem
      )
    );
  };

  const lowProductQuantity = (item) => {
    setCartItems((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem.product.id === item.product.id && cartItem.quantity > 0
          ? {
            ...cartItem,
            quantity: cartItem.quantity - 1,
            subPrice: (cartItem.quantity - 1) * cartItem.product.price
          }
          : cartItem
      )
    );
  };

  useEffect(() => {
    let newTotalPrice = 0;
    cartItems.forEach((item) => {
      newTotalPrice += item.subPrice;
    });
    setTotalPrice(newTotalPrice);
  }, [cartItems]);

  const updateCartState = () => {
    setCartState((prevState) => (prevState ? 0 : 1));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartState,
        totalPrice,
        quantity,
        subPrice,
        oldPrice,
        newPrice,
        currentImage,
        setSubPrice,
        setQuantity,
        addToCart,
        updateCartState,
        removeFromCart,
        lowProductQuantity,
        upProductQuantity,
        applyOffer,
        setCurrentImage
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
