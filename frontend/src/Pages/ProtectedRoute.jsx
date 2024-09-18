import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

function UserProtect({ children }) {
  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
}

// Validate the props
UserProtect.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProtect;
