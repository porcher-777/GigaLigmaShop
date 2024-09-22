import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CartProvider } from './ContextCart.jsx'
import { FilterProvider } from './ContextFilter.jsx'
import { ProductProvider } from './ContextProduct.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProductProvider>
      <CartProvider>
        <FilterProvider>
          <App />
        </FilterProvider>
      </CartProvider>
    </ProductProvider>
  </React.StrictMode>,
)
