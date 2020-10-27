import React from "react";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";

const categories = [
  "Underwear",
  "Pant",
  "Jumpsuit",
  "Jacket",
  "T-Shirt",
  "Button-Up",
  "Tee Shirt",
  "Hoodie",
  "Long Sleeve Tee Shirt",
  "Long Sleeve Button Up",
];
const sizes = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "2X",
  "3X",
  "4X",
  "XXL",
  "XXXL",
  "0",
  "2",
  "4",
  "6",
  "8",
  "10",
  "12",
  "14",
];
class ProductNav extends React.Component{

   brandHandler = (e, brand_id) => {
    e.preventDefault();
    this.props.fetchProdByBrand(brand_id);
  };

   categoryHandler = (e, category) => {
    e.preventDefault();
    this.props.fetchProdByCategory(category);
    return (<div>{category}</div>)
  };

   sizeHandler = (e, size) => {
    e.preventDefault();
    this.props.fetchProdBySize(size);
  };

  render() {
    return (
    <div className='product-nav'>
      <div className='product-nav-centered'>
        <div className='dropdown'>
          <li class='product-nav-title'>BRAND</li>
          <div className='dropdown-content'>
            {this.props.brands.map((brand) => {
              return (
                <li
                  key={brand.id}
                  onClick={(e) => this.brandHandler(e, brand.id)}
                  id={brand.id}
                >
                  {brand.name}
                </li>
              );
            })}
          </div>
        </div>
        <div className='dropdown'>
          <li class='product-nav-title'>CATEGORY</li>
          <ul className='dropdown-content'>
            {categories.map((category) => {
              return (
                <li onClick={(e) => this.categoryHandler(e, category)}>
                  {category}
                </li>
              );
            })}
          </ul>
        </div>
        <div className=' dropdown'>
          <li class='product-nav-title'>SIZE</li>
          <div className='dropdown-content'>
            {sizes.map((size) => {
              return <li onClick={(e) => this.sizeHandler(e, size)}>{size}</li>;
            })}
          </div>
        </div>
      </div>
    </div>
  );}
};

const mapStateToProps = (state) => {
  return {
    products: state.product.select,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProdByBrand: (brand_id) =>
      dispatch(actions.fetchProdByBrand(brand_id)),
    fetchProdByCategory: (category) =>
      dispatch(actions.fetchProdByCategory(category)),
    fetchProdBySize: (size) => dispatch(actions.fetchProdBySize(size)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductNav);
