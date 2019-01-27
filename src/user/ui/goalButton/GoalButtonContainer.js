import { connect } from "react-redux";
import LoginButton from "./GoalButton";
import { loginUser, getGoals } from "./LoginButtonActions";

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

const LoginButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginButton);

export default LoginButtonContainer;
