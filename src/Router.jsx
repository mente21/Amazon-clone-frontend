import React from 'react'
import { BrowserRouter, redirect, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing/Landing'
import Order from './pages/orders/Order'
import Cart from './pages/cart/Cart'
import Result from './pages/results/Results'
import ProductDetail from './pages/productdetail/Productdetail'
import Payment from './pages/payment/Payment'
import Product from './components/products/Product'
import Signin from './pages/Auth/Signin'
import {CheckoutProvider} from '@stripe/react-stripe-js/checkout';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import ProtectedrRoute from './components/protectedroute/ProtectedRoute'






const stripePromise = loadStripe('pk_test_51S8Lz1E8mUCQacJvPKLt8QkY8hpLUIefkR25OHRUjmoYVMfeKzhkKjPq94qGLhHxZdfezPiBFNeS3mmnLFjPKzmT00WDAwR0nk');

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<Signin />} />


        
        <Route path="/order" element={
          
          <ProtectedrRoute  msg={"you must login to acess your orders"}redirect={"/order"}> 
             <Order />
          </ProtectedrRoute>
          
          
          } />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:id" element={<ProductDetail />} />


        <Route path="/payment" element={

          <ProtectedrRoute  msg={"you must login to pay"}redirect={"/payment"}> 

          <Elements stripe={stripePromise} >
             <Payment />
        </Elements>
          </ProtectedrRoute>
                        } />

        <Route path="/products/catagory/:categoryName" element={<Result />} />

      </Routes>
    </BrowserRouter>
  )
}

export default Router
