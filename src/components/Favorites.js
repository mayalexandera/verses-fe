import React from "react";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";
import Favorite from "./Favorite";

class Favorites extends React.Component {
  componentDidMount() {
    this.props.initFavorites();
  }

  findBrand = (product) => {
    if (product !== "undefined" && product !== undefined) {
      let brand = this.props.brands.filter(
        (brand) => brand.id === product.brand_id
      );
      return brand[0];
    }
  };

  renderList = () => {
    console.log(this.props.favorites);
    if (
      this.props.favorites.length < 1 ||
      this.props.favorites.length === "undefined"
    )
      return (
        <div className='col product-nav-centered'>
          <li id='message-italic'>Your favorites are empty</li>
          <hr id='plan-title-hr-2' />
          <div className='row title-placeholder'>
            <button
              id='route-button'
              onClick={() => this.props.history.push("/products")}
            >
              BROWSE
            </button>
          </div>
        </div>
      );
    return this.props.favorites.map((fave) => {
      let product = fave["product"];
      let brand = this.findBrand(product);
      console.log(fave["product"], brand);
      return (
        <Favorite
          brand={brand}
          fave={fave}
          product={product}
          size={fave.size}
        />
      );
    });
  };

  render() {
    return <div className='section-products'>{this.renderList()}</div>;
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    favorites: state.favorite.select,
    brands: state.brand.select,
    products: state.product.select,
    error: state.favorite.error,
    loading: state.favorite.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product_id) => dispatch(actions.addProductToCart(product_id)),
    addToFavorites: (user_id, product_id) =>
      dispatch(actions.createFavorite(user_id, product_id)),
    deleteFavorite: (favorite) => dispatch(actions.deleteFavorite(favorite)),
    initFavorites: () => dispatch(actions.initFavorites()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
