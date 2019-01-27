import GoalContract from "../../build/contracts/Goal.json";
import GoalRegistryContract from "../../build/contracts/GoalRegistry.json";
import store from "../store.js";
import { UPDATE_PLEDGES } from "./actionTypes";
const contract = require("truffle-contract");

function updatePledges(pledges) {
  return {
    type: UPDATE_PLEDGES,
    payload: pledges
  };
}

export function createPledge() {
  let web3 = store.getState().web3.web3Instance;

  // Double-check web3's status.
  if (typeof web3 !== "undefined") {
    return function(dispatch) {
      // Using truffle-contract we create the authentication object.
      const goal = contract(GoalContract);
      goal.setProvider(web3.currentProvider);
      const goalRegistry = contract(GoalRegistryContract);
      goalRegistry.setProvider(web3.currentProvider);

      // Declaring this for later so we can chain functions on Authentication.
      var goalInstance;

      console.log("action called");

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }
        goal.defaults({
          from: coinbase
        });
        goalRegistry.defaults({
          from: coinbase
        });

        goal
          .new([
            1,
            1,
            "Lose Weight",
            1,
            "0xB1823546a3D953e458503b02422936f0317A2352",
            ["0xB1823546a3D953e458503b02422936f0317A2352"]
          ])
          .then(result => {
            console.log("pledge", result);

            goalRegistry
              .deployed()
              .then(instance => {
                instance.registerContract(result.address);
                console.log("store pledge", instance);
              })
              .then(_ => {
                console.log("Done");
                dispatch(getPledges());
              });
          })
          .catch(rejected => {
            console.log("Rejected pledge", rejected);
          });
      });
    };
  } else {
    console.error("Web3 is not initialized.");
  }
}

export function getPledges() {
  let web3 = store.getState().web3.web3Instance;

  // Double-check web3's status.
  if (typeof web3 !== "undefined") {
    return function(dispatch) {
      console.log("get pledges");

      // Using truffle-contract we create the authentication object.
      const goalRegistry = contract(GoalRegistryContract);
      goalRegistry.setProvider(web3.currentProvider);

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
          console.log("Got registry");
          instance.getGoals().then(goals => {
            console.log(goals);
            dispatch(updatePledges(goals));
          });
        });
      });
    };
  } else {
    console.error("Web3 is not initialized.");
  }
}

  export function vote(address) {
    let web3 = store.getState.web3.web3Instance;

     // Double-check web3's status.
    if (typeof web3 !== "undefined") {
    return function(dispatch) {
    // Using truffle-contract we create the authentication object.
      const originalContract = contract(GoalRegistryContract);
      originalContract.setProvider(web3.currentProvider);

      // Declaring this for later so we can chain functions on Authentication.
      var goalInstance;

      // Get current ethereum wallet.
      web3.eth.getCoinbase(async (error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }
        originalContract.defaults({
          from: coinbase
        });
        originalContract.at(address).then(instance => {
          instance.getGoals().then(goals => {
            console.log(goals);
          });


    

  }
