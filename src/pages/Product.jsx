import React, { useEffect } from "react";

import Helmet from "../components/Helmet";
import Section, { SectionTitle, SectionBody } from "../components/Section";
import Grid from "../components/Grid";
import ProductCard from "../components/ProductCard";
import ProductView from "../components/ProductView";

import productData from "../assets/fake-data/products";

import { useParams } from "react-router-dom";

const Product = (props) => {
  const slug = useParams();

  const product = productData.getProductBySlug(slug.slug);

  const relatedProducts = productData.getProducts(8);

  // vị trí đầu tiên
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <Helmet title={product.title}>
      <Section>
        <SectionBody>
        {/* hiện sản phẩm chủ đạo */}
          <ProductView product={product}/>
        </SectionBody>
      </Section>
      <Section>
        <SectionTitle>khám phá thêm</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {relatedProducts.map((item, index) => (
              <ProductCard
                key={index}
                img01={item.image01}
                img02={item.image02}
                name={item.title}
                price={Number(item.price)}
                slug={item.slug}
              />
            ))}
          </Grid>
        </SectionBody>
      </Section>
    </Helmet>
  );
};

export default Product;
