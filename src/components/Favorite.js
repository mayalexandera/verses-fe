import React from "react";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

const Favorite = (props) => {
  const clickHandler = (e) => {
    e.preventDefault();
    let favorite_id = props.fave.id;
    let product_id = props.fave.product.id;
    let size = props.fave.size_string;

    props.addFavoriteToCart(product_id, size, favorite_id);
  };

  const deleteFaveHandler = (e) => {
    e.preventDefault();
    props.deleteFavorite(props.fave.id);
  };

  let img = props.product.images.split(",")[0];
  return (
    <div className='favorite-card-wrapper'>
      <div className='favorite-card-body'>
        <div className='favorite-card-content-wrapper'>
          <div className='favorite-photo-wrapper'>
            <NavLink to={`/products/${props.product.id}`}>
              <img alt={props.product.name} src={img} />
            </NavLink>
            <button
              value='delete'
              id='delete-favorite-button'
              onClick={(e) => deleteFaveHandler(e)}
            >
              <ion-icon size='large' name='close' />
            </button>
          </div>
          <div className='favorite-card-details'>
            <div className='favorite-card-product-details'>
              <p className='product-title'>
                <strong>{props.brand.name}</strong>
              </p>
              <div className='product-subtitle'>
                <p>{props.product.price_string}</p>
                <p>{props.product.name}</p>
              </div>
            </div>

            <div className='favorite-actions'>
              <button
                value='add-to-cart'
                id='favorite-card-button'
                onClick={(e) => clickHandler(e)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFavoriteToCart: (product_id, size, favorite_id) =>
      dispatch(actions.addFavoriteToCart(product_id, size, favorite_id)),
    deleteFavorite: (favorite) => dispatch(actions.deleteFavorite(favorite)),
  };
};
export default connect(null, mapDispatchToProps)(Favorite);
