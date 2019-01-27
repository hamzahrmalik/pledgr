import React from "react";

const GetGoalsButton = ({ onLoginUserClick }) => {
  return (
    <li className="pure-menu-item">
      <a
        href="#"
        className="pure-menu-link"
        onClick={event => onLoginUserClick(event)}
      >
        Get Goals
      </a>
    </li>
  );
};

export default GetGoalsButton;
