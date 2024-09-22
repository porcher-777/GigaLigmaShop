import { useEffect, useState } from 'react';
import { useCart } from '../ContextCart.jsx'

export const Footer = () => {

    const { cartItems, cartState, updateCartState } = useCart();
    const [totalquantity, setTotalQuantity] = useState(0);

    const quantitySum = () => {
        let tmp = 0;
        cartItems.map((item) => {
            tmp += item.quantity;
        })
        setTotalQuantity(tmp);
    }

    useEffect(() => {
        quantitySum();
    }, [cartItems]);

    return (

        <footer className="bg-slate-200 opacity-60 text-balck justify-center rounded-md p-6 w-full">
            <div className="bt" onClick={() => updateCartState()}>

                {!cartState ? (<p>Go to shopping cart ({totalquantity})</p>)
                    : (<p>Leave cart ({totalquantity})</p>)}

            </div>
        </footer>
    )
}

export default Footer

