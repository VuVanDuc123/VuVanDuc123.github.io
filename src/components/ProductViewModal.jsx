import React, { useEffect, useState } from "react";

// useSelect, dispatch
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux/es/hooks/useDispatch";

import { remove } from "../redux/product-modal/productModalSlice";

import ProductView from "./ProductView";
import Button from "./Button";

import productData from "../assets/fake-data/products";

const ProductViewModal = () => {
  const productSlug = useSelector((state) => state.productModal.value);

  const dispatch = useDispatch();

  const [product, setProduct] = useState(undefined);

  //   const product = productData.getProductBySlug("ao-thun-dinosaur-03");

  useEffect(() => {
    setProduct(productData.getProductBySlug(productSlug));
  }, [productSlug]);

  return (
    <div
      className={`product-view__modal ${product === undefined ? "" : "active"}`}
    >
      <div className="product-view__modal__content">
        <ProductView product={product} />
        <div className="product-view__modal__content__close">
          <Button size="sm" onClick={() => dispatch(remove())}>
            đóng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductViewModal;
