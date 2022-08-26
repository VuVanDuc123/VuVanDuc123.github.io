import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Cart from '../pages/Cart'
import Catalog from '../pages/Catalog'
import Home from '../pages/Home'
import Product from '../pages/Product'

function Routers() {
  return (
    <Routes>
        <Route path="/" exact element={<Home />}/>
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:slug" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
    </Routes>
  )
}

export default Routers