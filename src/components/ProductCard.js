import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

const ProductCard = (props) => {
  console.log(props);
  let img;
  if (props.product !== "undefined" && props.product !== "undefined")
    img = props.product.images.split(",")[0];
  return (
    // <div className='col span-1-of-3'>
        <div className='product-card-wrapper'>
        <div className='product-card-body'>
      <div className='product-card-body-wrapper'>
            <div className='product-photo-wrapper'>
              <NavLink to={`/products/${props.product.id}`}>
                <img alt={props.product.name} src={img} />
              </NavLink>
            </div>
            <React.Fragment>
              <div className='product-card-details'>
                <p className='product-title'>
                  <strong>{props.brand.name}</strong>
                </p>
                <p className='product-subtitle'>{props.product.name}</p>
                <p className='product-subtitle'>{props.product.price_string}</p>
              </div>
            </React.Fragment>
          </div>
        </div>
      </div>
    // {/* </div> */}
  );
};

const mapStateToProps = (state, ownProps) => {
  console.log(state, ownProps);
  return {
    favorites: state.favorite.select,
    cart_items: state.cart.cart_items,
  };
};

export default connect(mapStateToProps)(ProductCard);
