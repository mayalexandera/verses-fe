import React from 'react'
import { AppRouter } from './components/AppRouter'
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import Layout from "./components/Layout";

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser()
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <div >
        <Layout >
          <AppRouter />
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
      isAuthenticated: state.auth.token !== null,
      current_user: state.auth.current_user
  };
}; 

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    fetchUser: () => dispatch(actions.fetchUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
