import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './store/auth.jsx'
import { ToastContainer } from 'react-toastify';
import { CartProvider } from './store/CartContext.jsx'

createRoot(document.getElementById('root')).render(

  <AuthProvider>
    <CartProvider>
    {/* <StrictMode> */}
      <App />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="toastBody"
/>
    {/* </StrictMode>, */}
    </CartProvider>
  </AuthProvider>
)
