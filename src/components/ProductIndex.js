import React from "react";
import { connect } from "react-redux";
import ProductCard from "./ProductCard";
import ProductNav from "./ProductNav";

const ProductIndex = (props) => {
  const findBrand = (product) => {
    let brand = props.brands.filter((brand) => brand.id === product.brand_id);
    return brand[0];
  };

  const renderList = () => {
    return props.products.map((prod) => {
      return <ProductCard brand={findBrand(prod)} key={prod.id} product={prod} />;
    })
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
  return {
    products: state.product.select,
    brands: state.brand.select,
    error: state.product.error,
  };
};

export default connect(mapStateToProps)(ProductIndex);

