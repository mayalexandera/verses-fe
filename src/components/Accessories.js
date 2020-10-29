import React from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import ProductCard from "./ProductCard";
import ProductNav from "./ProductNav";


const Accessories = (props) => {

    const findBrand = (product) => {
      let brand = props.brands.filter((brand) => brand.id === product.brand_id);
      return brand[0];
    };

  const renderList = () => {
    return props.accessories.map((prod) => {
      return (
        <ProductCard brand={findBrand(prod)} key={prod.id} product={prod} />
      );
    });
  };
  return (
    <>
      <ProductNav brands={props.brands} />
      <div className='section-products'>
        <div>{renderList()}</div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    accessories: state.product.accessories,
    brands: state.brand.select,
    error: state.product.error,
  };
};

export default connect(mapStateToProps)(Accessories);
