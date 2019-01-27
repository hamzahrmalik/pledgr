import GoalContract from "../../../../build/contracts/Goal.json";
import GoalRegistryContract from "../../../../build/contracts/GoalRegistry.json";
import { browserHistory } from "react-router";
import store from "../../../store";

const contract = require("truffle-contract");

export const USER_LOGGED_IN = "USER_LOGGED_IN";
function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    payload: user
  };
}

export function getGoals() {
  let web3 = store.getState().web3.web3Instance;

  // Double-check web3's status.
  if (typeof web3 !== "undefined") {
    return function(dispatch) {
      // Using truffle-contract we create the authentication object.
      const goalRegistry = contract(GoalRegistryContract);
      goalRegistry.setProvider(web3.currentProvider);

      // Declaring this for later so we can chain functions on Authentication.
      var goalInstance;

      // Get current ethereum wallet.
      web3.eth.getCoinbase(async (error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }
        goalRegistry.defaults({
          from: coinbase
        });
        goalRegistry.deployed().then(instance => {
          instance.getGoals().then(goals => {
            console.log(goals);
          });
        });
      });
    };
  } else {
    console.error("Web3 is not initialized.");
  }
}
