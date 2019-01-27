import React from "react";
import Frontend from "./Frontend";
import getWeb3 from "./util/web3/getWeb3";
import { createPledge, getPledges } from "./store/actions";
import { connect } from "react-redux";

getWeb3
  .then(results => {
    console.log("Web3 initialized!");
  })
  .catch(() => {
    console.log("Error in web3 initialization.");
  });

class App extends React.Component {
  render() {
    return <Frontend />;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    createPledgeFunc: () => {
      dispatch(createPledge());
    },
    updatePledges: () => {
      console.log("Update");
      dispatch(getPledges());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
