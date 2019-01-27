import { UPDATE_PLEDGES } from "./actionTypes";

const initialState = {
  pledges: []
};

const pledgesReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PLEDGES:
      console.log("updating pledges", action.payload);
      return Object.assign({}, state, { pledges: action.payload });
    default:
      return state;
  }
};

export default pledgesReducer;
