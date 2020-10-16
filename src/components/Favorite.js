import React from "react";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";

const Favorite = (props) => {
  const clickHandler = (e) => {
    e.preventDefault();
    let favorite_id = props.fave.id;
    let product_id = props.fave.product.id;
    let size = props.fave.size_string;

    e.target.value === "delete"
      ? props.deleteFavorite(favorite_id)
      : props.addFavoriteToCart(props.userId, product_id, size, favorite_id);
  };
  let img;
  if (props.product === "undefined" || props.product === undefined) return null;
  img = props.product.images.split(",")[0];
  return (
    <div className='col span-1-of-4'>
      <div className='favorite-card'>
        <div className='favorite-photo'>
          <img alt={props.product.name} src={img} />
          <button
            value='delete'
            id='delete-favorite-button'
            onClick={(e) => clickHandler(e)}
          >
            <ion-icon size='large' name='close'></ion-icon>
          </button>
        </div>
        <React.Fragment>
          <div className='favorite-card-details'>
            <p className='favorite-title'>{props.brand.name}</p>
            <p className='favorite-subtitle'>{props.product.name}</p>
          </div>

          <p className='favorite-price'>{props.product.price_string}</p>
          <p className='favorite-price'>size: {props.fave.size_string}</p>
        </React.Fragment>
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
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFavoriteToCart: (user_id, product_id, size, favorite_id) =>
      dispatch(
        actions.addFavoriteToCart(user_id, product_id, size, favorite_id)
      ),
    deleteFavorite: (favorite) => dispatch(actions.deleteFavorite(favorite)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
