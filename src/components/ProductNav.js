import React from "react";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";

const categories = [
  "Underwear",
  "Pant",
  "Coverall",
  "Jacket",
  "Blazer",
  "T-Shirt",
  "Button-Up",
  "Hoodie",
  "Long Sleeve T-Shirt",
  "Long Sleeve Button Up",
  "Short Sleeve Button Up",
  "All"
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
  "16",
  "18",
  "20",
  "22",
  "24",
  "All"
];
class ProductNav extends React.Component {

  productHandler = (e, value) => {
    e.preventDefault();
    e.target.value === "All"
      ? this.props.initProducts()
      : this.props.fetchProdByFilter(e.target.type, value);
  };


  render() {
    return (
      <>
        <div className='product-nav'>
          <div className='product-nav-centered'>
            <div className='dropdown'>
              <li className='product-nav-title'>BRAND</li>
              <div className='dropdown-content'>
                <li value='All' onClick={(e) => this.productHandler(e)}>
                  All
                </li>
                {this.props.brands.map((brand) => {
                  return (
                    <li
                      type='brand'
                      key={brand.id}
                      onClick={(e) => this.productHandler(e, brand.id)}
                      id={brand.id}
                    >
                      {brand.name}
                    </li>
                  );
                })}
              </div>
            </div>
            <div className='dropdown'>
              <li className='product-nav-title'>CATEGORY</li>
              <ul className='dropdown-content'>
                <li value='All' onClick={(e) => this.productHandler(e)}>
                  All
                </li>

                {categories.map((category) => {
                  return (
                    <li
                    type="category"
                      key={category}
                      onClick={(e) => this.productHandler(e, category)}
                    >
                      {category}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className=' dropdown'>
              <li className='product-nav-title'>SIZE</li>
              <div className='dropdown-content'>
                <li value='All' onClick={(e) => this.productHandler(e)}>
                  All
                </li>
                {sizes.map((size) => {
                  return (
                    <li type="size" key={size} onClick={(e) => this.productHandler(e, size)}>
                      {size}
                    </li>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.product.select,
    accessories: state.product.accessories,
    brands: state.brand.select,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProdByFilter: (type,value) =>
      dispatch(actions.fetchProdByFilter(type,value)),
    initProducts: () => dispatch(actions.initProducts())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductNav);
