import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

const ProductCard = (props) => {
  let img = props.product.images.split(",")[0];
  return (
    <div className='product-card-wrapper'>
      <div className='product-card-body'>
        <div className='product-card-content-wrapper'>
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
  );
};

const mapStateToProps = (state) => {
  return {
    favorites: state.favorite.select,
    cart_items: state.cart.cart_items,
  };
};

export default connect(mapStateToProps)(ProductCard);
