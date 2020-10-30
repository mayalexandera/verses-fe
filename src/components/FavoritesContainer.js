import React from "react";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";
import Favorites from "./Favorites";
import ProfileHeader from "./ProfileHeader";

class FavoritesContainer extends React.Component {

  componentDidMount = () => {
    this.props.initFavorites()
  }
  render() {
    let header;
    this.props.current_user !== null 
      ? (header = <ProfileHeader />)
      : (header = null);
    return (
      <div className='section-favorites-wrapper'>
        <div className='section-favorites'>
          <div className='order-title'>
            <p>
              <strong>Favorites</strong>
            </p>
            <div className='favorites-header-wrapper'>
              <div className='order-header-container'>
                <div className='order-header-links'>{header}</div>
              </div>
            </div>
          </div>
          <div className='spacer' />
        <Favorites />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    favorites: state.favorite.select,
    current_user: state.auth.current_user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initFavorites: () => dispatch(actions.initFavorites()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesContainer);
