import React from "react";
import { connect } from 'react-redux'
import * as actions from "../store/actions/index";
import BrandCard from "./BrandCard";



const Brands = (props) => {
  return (
    <div className='brands-landing'>
      <div className='spacer' />
      <div className='brands-title'>Participating Companies</div>
      <div className='spacer' />
      {props.brands.map((brand) => {
        return <BrandCard brand={brand} />;
      })}
      <div className='spacer' />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    brands: state.brand.select,
    products: state.product.select,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initBrands: () => dispatch(actions.initBrands())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Brands);
