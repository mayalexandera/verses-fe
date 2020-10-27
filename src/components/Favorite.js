import React from "react";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";

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

  let img;
  if (props.product === undefined && props.product === undefined) return null;
  img = props.product.images.split(",")[0];
  return (
    <div className='favorite-card-wrapper'>
      <div className='favorite-card-body'>
        <div className='favorite-card-content-wrapper'>
          <div className='favorite-photo-wrapper'>
            <img alt={props.product.name} src={img} />
            <button
              value='delete'
              id='delete-favorite-button'
              onClick={(e) => deleteFaveHandler(e)}
            >
              <ion-icon size='large' name='close'></ion-icon>
            </button>
          </div>
          <div className='favorite-card-details'>
            <div className='favorite-card-info'>
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

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFavoriteToCart: (product_id, size, favorite_id) =>
      dispatch(actions.addFavoriteToCart(product_id, size, favorite_id)),
    deleteFavorite: (favorite) => dispatch(actions.deleteFavorite(favorite)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
