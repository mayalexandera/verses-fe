import React from "react";
import { connect } from "react-redux";
import ProductCard from "./ProductCard";


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
      <div className='section-products'>
        {renderList()}
      </div>
  );
};

const mapStateToProps = (state) => {
  return {
    accessories: state.product.select.filter(prod => prod.product_type === "Accessory"),
    brands: state.brand.select,
  };
};

export default connect(mapStateToProps)(Accessories);
