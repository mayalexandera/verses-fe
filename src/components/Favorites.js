import React from "react";
import { connect } from "react-redux";
import Favorite from "./Favorite";

const Favorites = (props) => {
  const findBrand = (brand_id) => {
    return props.brands.filter((brand) => brand.id === brand_id)[0];
  };

  const findProduct = (fave) => {
    return props.products.filter((prod) => prod.id === fave.product_id)[0];
  };

  const renderList = () => {
    if (!props.loading && !props.loading)
      return props.favorites.map((fave) => {
        let product = findProduct(fave);
        return (
          <Favorite
            brand={findBrand(product.brand_id)}
            fave={fave}
            product={product}
            size={fave.size}
            key={fave.id}
          />
        );
      });
  };

  let message;

  message =
    props.favorites === null || props.favorites.length === 0 ? (
      <p className='favorites-placeholder'>
        Items added to your favorites will be saved here.
      </p>
    ) : (
      <div>{renderList()}</div>
    );

  return (
    <>
      <div className='spacer' />
      {message}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    favorites: state.favorite.select,
    brands: state.brand.select,
    products: state.product.select,
    loading: state.favorite.loading,
  };
};

export default connect(mapStateToProps)(Favorites);
