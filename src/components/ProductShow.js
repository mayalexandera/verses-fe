import React from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";

class ProductShow extends React.Component {
  state = {
    productSize: null,
  };

  componentDidMount() {
    this.props.fetchShowProduct(this.props.match.params.product_id);
  }

  handleClick = (e) => {
    e.preventDefault();
    if (this.props.isAuthenticated && this.props.isAuthenticated) {
      if (e.target.value === "addToCart") {
        this.props.addToCart(
          this.props.userId,
          this.props.showProduct.id,
          this.state.productSize
        );
      }

      if (e.target.value === "favorite") {
        this.props.addToFavorites(
          this.props.userId,
          this.props.showProduct.id,
          this.state.productSize
        );
      }
    } else {
      this.props.history.push("/login");
    }
  };

  verifyUser = (e) => {
    return this.props.userId !== null ? this.handleClick(e) : "";
  };

  handleSizeClick = (e) => {
    e.preventDefault();
    this.setState({ productSize: e.target.value });
  };

  button = (size) => {
    return size === this.state.productSize ? "size-button-clicked" : "size-button"
  }

  renderProduct = () => {

    return (
      <section className='product-show'>
        <div className='col span-2-of-3'>
          <div>
            {!this.props.showProduct ? (
              <div>loading</div>
            ) : (
              this.props.images.map((image) => {
                return (
                  <div key={this.props.images[image]}>
                    <img
                      key={image.id}
                      src={image}
                      images={this.props.images}
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div className='span-1-of-3' id='product-text'>
          <p className='product-brand-show-title'>{this.props.brand.name}</p>
          <p className='product-show-subtitle'>{this.props.showProduct.name}</p>
          <p className='product-show-subtitle'>
            {this.props.showProduct.price_string}
          </p>
          <hr />
            <p className='product-show-select'>Select Size</p>
          <div className='product-add-to-bag-wrapper'>
            {this.props.sizes.map((size) => {
              return (
                <button
                  onClick={(e) => this.handleSizeClick(e)}
                  className='product-show-subtitle'
                  id={this.button(size)}
                  value={size}
                >
                  {size}
                </button>
              );
            })}
          </div>
          <ul className='product-actions'>
            <button
              onClick={(e) => this.handleClick(e)}
              value='addToCart'
              id='add-to-cart-button'
            >
              ADD TO CART
            </button>
            <button
              onClick={(e) => this.handleClick(e)}
              value='favorite'
              id='add-to-favorites-button'
            >
              FAVORITE
            </button>
          </ul>
          <div className='product-show-description-wrapper'>
            <p>{this.props.showProduct.description}</p>
          </div>
          <a id='size-chart' href={this.props.brand.size_chart}>
            Size Chart
          </a>
        </div>
      </section>
    );
  };

  render() {
    return (
      <React.Fragment>
        <div className='section-products'>
          {" "}
          <br />
          {this.renderProduct()}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state, ownProps);
  return {
    showProduct: state.product.show,
    brand: state.brand.show,
    sizes: state.product.sizes,
    images: state.product.images,
    userId: state.auth.userId,
    cart: state.cart.cart,
    cart_items: state.cart.cart_items,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (user_id, product_id, size) =>
      dispatch(actions.addProductToCart(user_id, product_id, size)),
    fetchShowProduct: (product_id) =>
      dispatch(actions.fetchShowProduct(product_id)),
    addToFavorites: (user_id, product_id, size) =>
      dispatch(actions.createFavorite(user_id, product_id, size)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductShow);
