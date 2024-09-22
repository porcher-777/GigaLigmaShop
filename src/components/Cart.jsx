import { useCart } from '../ContextCart.jsx'

export const Cart = () => {

  const {
    cartItems,
    cartState,
    totalPrice,
    removeFromCart,
    lowProductQuantity,
    upProductQuantity
  } = useCart();
  console.log(cartItems)

  const removeAll = () => {
    cartItems.map((item) => {
      removeFromCart(item.id)
    })
  }

  return (
    <div className="cart p-4 bg-slate-500 rounded text-white">
      <table className="w-full text-left font-median">
        <thead>
          <tr>
            <th>Product</th>
            <th>Remove</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>SubTotal</th>
          </tr>
        </thead>

        {cartState && cartItems?.map((item, i) => {
          return (
            <tbody key={`i-${i}`}>
              <tr>
                <td className="py-4">
                  <div className="flex items-center">
                    <img className="h-16 w-16 mr-4" src={item.product.thumbnail} />
                    <span>{item.product.title}</span>
                  </div>
                </td>
                <td><button
                  className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                  onClick={() => { removeFromCart(item) }}
                >Remove</button></td>
                <td className="py-4">${(item.newPrice).toFixed(2)}</td>
                <td className="py-4">
                  <div className="flex items-center">
                    <button onClick={() => lowProductQuantity(item)} className='p-4'> - </button>
                    <span> {item.quantity} </span>
                    <button onClick={() => upProductQuantity(item)} className='p-4'> + </button>
                  </div>
                </td>
                <td className="py-4"> ${(item.subPrice).toFixed(2)} </td>
              </tr>
            </tbody>
          )
        })}
      </table>
      <div className='flex flex-cols items-center justify-content space-x-5'>
        <h1 className='font-bold'>Total : ${(totalPrice).toFixed(2)}</h1>
        <button
          className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-1 px-4 border border-red-500 hover:border-transparent rounded"
          onClick={removeAll}
        >Empty cart</button>
      </div>
    </div>
  )
}

export default Cart;