import React from "react";
import { connect } from "react-redux";
import ProductCard from "./ProductCard";
import ProductNav from "./ProductNav";

const ProductIndex = (props) => {
  const findBrand = (product) => {
    console.log(product);
    let brand = props.brands.filter((brand) => brand.id === product.brand_id);
    console.log(brand[0]);
    return brand[0];
  };

  const renderList = () => {
    console.log(props.products);
    return props.products.map((prod) => {
      let brand = findBrand(prod);
      return <ProductCard brand={brand} key={prod.id} product={prod} />;
    });
  };
  return (
    <div className='background'>
      <ProductNav brands={props.brands} />
      <div className=' section-products'>
        {" "}
        <br />
        {renderList()}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    products: state.product.select,
    brands: state.brand.select,
    error: state.product.error,
  };
};

export default connect(mapStateToProps)(ProductIndex);

