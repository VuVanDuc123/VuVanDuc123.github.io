import React from "react";

import { BrowserRouter } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

import ProductViewModal from "./ProductViewModal";

import Routers from "../routes/Routes";

function Layout() {


  return (
    <BrowserRouter>
      <div>
        <Header />
        <div className="container">
          <div className="main">
            <Routers />
          </div>
        </div>
        <Footer />
        <ProductViewModal />
      </div>
    </BrowserRouter>
  );
}

export default Layout;
