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
];
class ProductNav extends React.Component {
  state = {
    queries: [],
  };

  brandHandler = (e, brand_id) => {
    e.preventDefault();
    let brand = this.props.brands.filter((brand) => brand.id === brand_id)[0]

    this.setState((state) => ({ queries:[...state.queries, brand.name ]})
    );
    this.props.fetchProdByBrand(brand_id);
  };

  categoryHandler = (e, category) => {
    e.preventDefault();
    this.props.fetchProdByCategory(category);
    return <div>{category}</div>;
  };

  sizeHandler = (e, size) => {
    e.preventDefault();
    this.props.fetchProdBySize(size);
  };

  render() {
    return (
      <>
        <div className='product-nav'>
          <div className='product-nav-centered'>
            <div className='dropdown'>
              <li className='product-nav-title'>BRAND</li>
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
              <li className='product-nav-title'>CATEGORY</li>
              <ul className='dropdown-content'>
                {categories.map((category) => {
                  return (
                    <li
                      key={category}
                      onClick={(e) => this.categoryHandler(e, category)}
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
                {sizes.map((size) => {
                  return (
                    <li key={size} onClick={(e) => this.sizeHandler(e, size)}>
                      {size}
                    </li>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div>
          {this.state.queries.map(query => {
            return (
              <button id="product-nav-button">{query}</button>
            )
          })}
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
    fetchProdByBrand: (brand_id) =>
      dispatch(actions.fetchProdByBrand(brand_id)),
    fetchProdByCategory: (category) =>
      dispatch(actions.fetchProdByCategory(category)),
    fetchProdBySize: (size) => dispatch(actions.fetchProdBySize(size)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductNav);
