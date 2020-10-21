import React from "react";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";
import Favorite from "./Favorite";
import ProfileHeader from "./ProfileHeader";

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
    if (
      this.props.favorites.length < 1 ||
      this.props.favorites.length === "undefined"
    )
      return (
        <div className=' product-nav-centered'>
          <p className='brands-subtitle' id='message'>
            Items added to your Favorites will be saved here.
          </p>
        </div>
      );
    return this.props.favorites.map((fave) => {
      let product = fave["product"];
      let brand = this.findBrand(product);
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
    return (
      <div className='section-orders-wrapper'>
        <div className='section-favorites'>
          <div className='order-title'>
            <p>
              <strong>Favorites</strong>
            </p>
            <div className='favorites-header-wrapper'>
              <div className='order-header-container'>
                <div className='order-header-links'>
                  <ProfileHeader />
                </div>
              </div>
            </div>
          </div>
          {this.renderList()}
        </div>
      </div>
    );
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
