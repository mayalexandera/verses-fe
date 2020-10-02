import React from "react";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";
import { Link } from "react-router-dom";


const Favorite = (props) => {

    const clickHandler = (e) => {
      e.preventDefault();
      let favorite_id = props.fave.id;
      let product_id = props.fave.product.id;
      let size = props.fave.size_string;
      let user_id = props.fave.member_id;

      console.log(favorite_id, product_id, user_id);
      e.target.value === "delete"
        ? props.deleteFavorite(favorite_id)
        : props.addFavoriteToCart(props.userId, product_id, size, favorite_id);
    }; 
  console.log(props);
  let img;
  if (props.product === "undefined" || props.product === undefined) return null
    img = props.product.images.split(",")[0];
  return (
    <div className='col span-1-of-3'>
      <div className='col favorite-outer'>
        <div className='favorite-card'>
          <div className='favorite-photo'>
            <img alt={props.product.name} src={img} />
          </div>
          <React.Fragment>
            <ul className='favorite-card-details'>
              <li className='product-title'>
                <li>{props.brand.name}</li>
              </li>

              <Link
                className='product-subtitle'
                to={`/products/${props.product.id}`}
              >
                <li className='product-subtitle'>{props.product.name}</li>
              </Link>

              <li className='product-subtitle'>
                <li>{props.product.price_string}</li>
              </li>
              <li className='product-subtitle'>
                <li>{props.fave.size_string}</li>
              </li>
            </ul>
          </React.Fragment>
          <div className='row favorite-actions'>
            <button
              value='delete'
              className='product-subtitle'
              id='favorite-card-button'
              onClick={(e) => clickHandler(e)}
            >
              Delete Favorite
            </button>
            <button
              value='add-to-cart'
              className='product-subtitle'
              id='favorite-card-button'
              onClick={(e) => clickHandler(e)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    favorites: state.favorite.select,
    products: state.product.select,
    userId: state.auth.userId
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
