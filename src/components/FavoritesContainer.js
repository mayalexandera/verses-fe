import React from "react";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";
import Favorites from "./Favorites";
import ProfileHeader from "./ProfileHeader";

class FavoritesContainer extends React.Component {
  render() {
    let header;
    this.props.current_user !== null && this.props.current_user !== null
      ? (header = <ProfileHeader />)
      : (header = null);
    return (
      <div>
        <div className='section-favorites-wrapper'>
          <div className='section-favorites'>
            <div className='order-title'>
              <p>
                <strong>Favorites</strong>
              </p>
              <div className='favorites-header-wrapper'>
                <div className='order-header-container'>
                  <div className='order-header-links'>{header}</div>
                </div>
              </div>
            </div>
            <div className='spacer' />
          </div>
          <Favorites/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    favorites: state.favorite.select,
    brands: state.brand.select,
    current_user: state.auth.current_user,
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

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesContainer);
