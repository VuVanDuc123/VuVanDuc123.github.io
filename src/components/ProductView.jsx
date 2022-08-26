import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { addItem } from "../redux/shopping-cart/cartItemsSlide";

import { useNavigate } from "react-router-dom";

import Button from "./Button";
import numberWithCommas from "../utils/numberWithCommas";

const ProductView = (props) => {
  const dispatch = useDispatch();

  let product = props.product;

  // phần 3
  if (product === undefined) {
    product = {
      price: 0,
      title: "",
      colors: [],
      size: [],
    };
  }

  const [previewImg, setPreviewImg] = useState(product.image01);

  const [descriptionExpand, setDescriptionExpand] = useState(false);

  const [color, setColor] = useState(undefined);
  const [size, setSize] = useState(undefined);

  // số lượng
  const [quantity, setQuantity] = useState(1);
  const updateQuantity = (type) => {
    if (type === "plus") {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
    }
  };

  // khi chuyển sang product khác ta phải cập nhập lại
  useEffect(() => {
    setPreviewImg(product.image01); // cập nhập ảnh
    setQuantity(1); // số lượng 1
    setColor(undefined); // màu sắc 0
    setSize(undefined); // size 0
  }, [product]);

  // giỏ hàng
  //   check dữ liệu đủ chưa
  const check = () => {
    if (color === undefined) {
      alert("Vui lòng chọn màu!");
      return false;
    }

    if (size === undefined) {
      alert("Vui lòng chọn thêm size!");
      return false;
    }
    return true;
  };

  // thêm vào
  const addToCart = () => {
    if (check()) {
      // console.log({ color, size, quantity });
      dispatch(
        addItem({
          slug: product.slug,
          color: color,
          size: size,
          quantity: quantity,
          price: product.price,
        })
      );
      alert("Success");
    }
  };

  // đến carts
  // bỏ useHistory rồi ta chuyển sang useNavigate
  const navigation = useNavigate();
  const goToCart = () => {
    if (check()) {
      dispatch(
        addItem({
          slug: product.slug,
          color: color,
          size: size,
          quantity: quantity,
          price: product.price,
        })
      );
      navigation("/cart");
    }
  };

  return (
    <div className="product">
      <div className="product__images">
        <div className="product__images__list">
          <div
            className="product__images__list__item"
            onClick={() => setPreviewImg(product.image01)}
          >
            <img src={product.image01} alt="ảnh 1" />
          </div>
          <div
            className="product__images__list__item"
            onClick={() => setPreviewImg(product.image02)}
          >
            <img src={product.image02} alt="ảnh 2" />
          </div>
        </div>

        <div className="product__images__main">
          <img
            // src={previewImg}
            src={previewImg}
            alt="ảnh chính"
          />
        </div>

        <div
          className={`product-description mobile ${
            descriptionExpand ? "expand" : ""
          }`}
        >
          <div className="product-description__title">chi tiết sản phẩm</div>
          <div
            className="product-description__content"
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></div>
          <div className="product-description__toggle">
            <Button
              size="sm"
              onClick={() => setDescriptionExpand(!descriptionExpand)}
            >
              {descriptionExpand ? "thu gọn" : "xem thêm"}
            </Button>
          </div>
        </div>
      </div>

      <div className="product__info">
        <h1 className="product__info__title">{product.title}</h1>
        <div className="product__info__item">
          <span className="product__info__item__price">
            {numberWithCommas(product.price)} đ
          </span>
        </div>

        <div className="product__info__item">
          <div className="product__info__item__title">Màu sắc</div>
          <div className="product__info__item__list">
            {product.colors.map((item, index) => (
              <div
                key={index}
                className={`product__info__item__list__item ${
                  color === item ? "active" : ""
                }`}
                onClick={() => setColor(item)}
              >
                <div className={`circle bg-${item}`}></div>
              </div>
            ))}
          </div>
        </div>

        <div className="product__info__item">
          <div className="product__info__item__title">Kích cỡ</div>
          <div className="product__info__item__list">
            {product.size.map((item, index) => (
              <div
                key={index}
                className={`product__info__item__list__item ${
                  size === item ? "active" : ""
                }`}
                onClick={() => setSize(item)}
              >
                <span className="product__info__item__list__item__size">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="product__info__item">
          <div className="product__info__item__title">số lượng</div>
          <div className="product__info__item__quantity">
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("minus")}
            >
              <i className="bx bx-minus"></i>
            </div>
            <div className="product__info__item__quantity__input">
              {quantity}
            </div>
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("plus")}
            >
              <i className="bx bx-plus"></i>
            </div>
          </div>
        </div>

        <div className="product__info__item">
          <Button onClick={() => addToCart()}>thêm vào giỏ</Button>
          <Button onClick={() => goToCart()}>mua ngay </Button>
        </div>
      </div>
    </div>
  );
};

ProductView.propTypes = {
  product: PropTypes.object,
};

export default ProductView;
