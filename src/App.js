import React from "react";
import { AppRouter } from "./components/AppRouter";
import { connect } from "react-redux";
import Layout from "./components/Layout";

class App extends React.Component {
  render() {
    return (
      <div>
        <Layout>
          <AppRouter />
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(App);
