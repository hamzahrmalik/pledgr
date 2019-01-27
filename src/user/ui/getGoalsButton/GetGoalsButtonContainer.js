import { connect } from "react-redux";
import GetGoalsButton from "./GetGoalsButton";
import { getGoals } from "./GetGoalsButtonActions";

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onLoginUserClick: event => {
      event.preventDefault();

      dispatch(getGoals());
    }
  };
};

const GetGoalsButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GetGoalsButton);

export default GetGoalsButtonContainer;
