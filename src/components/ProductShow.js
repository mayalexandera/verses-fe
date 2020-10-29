import React from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";

class ProductShow extends React.Component {
  state = {
    productSize: null,
    errorMessage: null,
  };

  componentDidMount() {
    this.props.fetchShowProduct(this.props.match.params.product_id);
  }

  handleClick = (e) => {
    e.preventDefault();
    this.state.productSize === null
      ? this.setState({ errorMessage: "Please select a size." })
      : this.submitRequest(e);
  };

  submitRequest = (e) => {
    if (this.props.isAuthenticated && this.props.isAuthenticated) {
      if (e.target.value === "addToCart") {
        this.props.addToCart(this.props.showProduct.id, this.state.productSize);
      }

      if (e.target.value === "favorite") {
        this.props.addToFavorites(
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
    e.target.value === this.state.productSize
      ? this.setState({ productSize: null })
      : this.setState({ productSize: e.target.value, errorMessage: null });
  };

  button = (size) => {
    return size === this.state.productSize
      ? "size-button-clicked"
      : "size-button";
  };

  renderProduct = () => {
    return (
      <section className='product-show'>
        <div className='col span-3-of-5'>
          {!this.props.showProduct ? (
            <div>loading...</div>
          ) : (
            this.props.images.map((image) => {
              return (
                <div key={this.props.images[image]}>
                  <img key={image.id} src={image} images={this.props.images} />
                </div>
              );
            })
          )}
        </div>
        <div className='span-2-of-5 product-header'>
          <p className='product-brand-show-title'>{this.props.brand.name}</p>
          <p className='product-show-subtitle'>{this.props.showProduct.name}</p>
          <p className='product-show-subtitle'>
            {this.props.showProduct.price_string}
          </p>
          <hr id='product-show-hr' />
          <div className='product-menu'>
            <div className='product-show-select'>
              <p>Select Size</p>
              <a className='size-chart' href={this.props.brand.size_chart}>
                Size Chart
              </a>
            </div>
            <div>
              {this.props.sizes !== []
                ? this.props.sizes.map((size) => {
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
                  })
                : null}
            </div>
            <ul className='product-actions'>
              <div className='errorMessage'>{this.state.errorMessage}</div>
              <button
                onClick={(e) => this.handleClick(e)}
                value='addToCart'
                id='add-to-cart-button'
              >
                Add to Cart
              </button>
              <button
                onClick={(e) => this.handleClick(e)}
                value='favorite'
                id='add-to-favorites-button'
              >
                Add To Favorites
              </button>
            </ul>
            <div className='product-show-description-container'>
              <p>Description</p>
              <hr id='product-show-hr' />
              <div className='product-show-description'>
                {this.props.showProduct.description}
              </div>
            </div>
            <div className='fit-details-container'>
              <p>Fit Details</p>
              <hr id='product-show-hr' />
              <ul className='fit-details'>
                {this.props.showProduct.fit_details !== undefined &&
                this.props.showProduct.fit_details !== null
                  ? this.props.showProduct.fit_details
                      .split(",")
                      .map((detail) => {
                        return <li>{detail}</li>;
                      })
                  : <span>{":)"}</span>}
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  };

  render() {
    return (
      <React.Fragment>
        <br />
        {this.renderProduct()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showProduct: state.product.show,
    brand: state.brand.show,
    sizes: state.product.sizes,
    images: state.product.images,
    userId: state.auth.userId,
    cart: state.cart.cart,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product_id, size) =>
      dispatch(actions.addProductToCart(product_id, size)),
    fetchShowProduct: (product_id) =>
      dispatch(actions.fetchShowProduct(product_id)),
    addToFavorites: (product_id, size) =>
      dispatch(actions.createFavorite(product_id, size)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductShow);
