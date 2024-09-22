import { useState } from 'react';
import { Product } from './Product.jsx';
import { ProductDetails } from "./ProductDetails.jsx";
import { useCart } from '../ContextCart.jsx';
import { useFilter } from '../ContextFilter.jsx';
import { useProduct } from '../ContextProduct.jsx';
import { Cart } from './Cart.jsx';

export const Eshop = () => {

    const {products} = useProduct();

    const [
        currentProduct,
        setCurrentProduct
    ] = useState(null);

    const { cartState } = useCart();

    const {
        filterProductsByCategory,
        sortProductsByPrice,
    } = useFilter();

    const filteredAndSortedProducts = sortProductsByPrice(filterProductsByCategory(products));

    return (
        <main className="min-h-80 p-6 bg-slate-300">
            {cartState ? (
                <Cart />
            ) : (
                currentProduct ? (
                    <div className='p-4 bg-slate-500 rounded text-white'>
                        <div className="bt" onClick={() => setCurrentProduct(null)}>
                            Back to home
                        </div>
                        <ProductDetails setCurrentProduct={setCurrentProduct} currentProduct={currentProduct} />
                    </div>
                ) : (
                    <div className="container m-auto space-y-4">
                        <div className="grid grid-cols-3 gap-4 container m-auto">
                            {filteredAndSortedProducts.map((product, i) => (
                                <Product setCurrentProduct={setCurrentProduct} product={product} key={`i-${i}`} />
                            ))
                            }
                        </div>
                    </div>
                )
            )}
        </main>
    );
}

export default Eshop;
