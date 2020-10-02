import React from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";

class AccountInfo extends React.Component {
  // componentDidMount() {
  //   this.props.fetchUser()
  // }

  render() {
    console.log(this.props.current_user)
    return (
      <div className='account-details'>
        <form>
          {/* <input type='text' value={this.props.current_user.name.split(" ")[0]} />
          <input type='text' value={this.props.current_user.name.split(" ")[1]} />
          <input type='text' value={this.props.current_user.email} /> */}
          <input type='text' placeholder='First Name' />
          <input type='text' placeholder="Last Name" />
          <input type='text' placeholder="email" />
        </form>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    current_user: state.auth.current_user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(actions.fetchUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);