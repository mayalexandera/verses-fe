import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const ProductCard = (props) => {
  console.log(props);
  let img;
  if (props.product !== "undefined" && props.product !== "undefined")
    img = props.product.images.split(",")[0];
  return (
    <li className='col span-1-of-3'>
      <div className='product-card'>
        <div className='col product-outer'>
          <div className='product-photo'>
            <Link to={`/products/${props.product.id}`}>
              <img alt={props.product.name} src={img} />
            </Link>
          </div>
          <React.Fragment>
            <ul className='product-card-details'>
              <li className='product-title'>{props.brand.name}</li>
              <li className='product-subtitle'>{props.product.name}</li>
              <li className='product-subtitle'>{props.product.price_string}</li>
            </ul>
          </React.Fragment>
        </div>
      </div>
    </li>
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
