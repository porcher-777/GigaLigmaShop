import RatingComponent from '../assets/helpers.jsx';
import React, { useEffect, useState } from "react";
import { useCart } from '../ContextCart.jsx';

export const ProductDetails = ({ currentProduct }) => {
  const { addToCart, quantity, setQuantity, subPrice, oldPrice, setSubPrice, newPrice, currentImage, setCurrentImage } = useCart();
  const productWithQuantities = [
    { product: currentProduct, quantity, subPrice, oldPrice, newPrice }
  ]

  useEffect(() => {
    setCurrentImage(currentProduct.thumbnail)
}, []);

  console.log(productWithQuantities);

  const handleAddToCart = (productWithQuantities) => {
    addToCart(productWithQuantities);
  }

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value))
    setSubPrice(parseInt(event.target.value) * currentProduct.price)
  }

  const imageChange = (img) => {
    setCurrentImage(img)
  }

  return (
    <div className="p-4 w-full m-auto">
      <div className="grid grid-cols-2 gap-4 rounded bg-neutral-200 p-5">
        <div className="p-4">
          <img className='w-full rounded-lg' src={currentImage} alt={currentProduct.title} /><br></br>
          <div className='flex flex-cols space-x-1'>
            {currentProduct.images.map((img, i) => (
              <img className='w-1/5 rounded-lg' src={img} key={`i-${i}`} onClick={() => imageChange(img)}/>
            ))
            }
          </div>
        </div>
        <div className="flex flex-col justify-center text-black">
          <h3 className="text-left text-xl drop-shadow-xl">
            <span className='font-semibold'>{currentProduct.category.toUpperCase()}</span> : {currentProduct.title} - {currentProduct.brand}
          </h3>
          <div className="text-left text-xl drop-shadow-xl"><span className='font-semibold'>Rating</span> : <RatingComponent rating={currentProduct.rating} /></div>
          <h3 className="text-left text-xl drop-shadow-xl font-semibold">Description :</h3>
          <p className="text-left mb-4">{currentProduct.description}</p>

          {currentProduct.category === 'smartphones' ? (
            <h3 className="text-left text-xl drop-shadow-xl">Price : <span className='line-through text-sm text-red-400'> ${currentProduct.price} </span> &emsp; <span className='text-green-400' > $ {(currentProduct.price - (currentProduct.price * (currentProduct.discountPercentage / 100))).toFixed(2)} </span> </h3>
          ) : (
            <h3 className="text-left text-xl drop-shadow-xl"><span className=''>Price</span> : ${currentProduct.price}</h3>
          )}

          <h3 className="text-left text-xl drop-shadow-xl"><span className='font-semibold'>Quantity</span> : <input type="number" value={quantity} onChange={(event) => handleQuantityChange(event)} min="1" max={currentProduct.stock} /></h3>
          <button
            onClick={() => handleAddToCart(productWithQuantities)}
            className="self-start w-3/4 bg-gray-900 text-white py-2 px-4 rounded-full font-bold mt-4">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
