import { Redirect, Route } from "react-router-dom";
import Cookie from "js-cookie";

const ProtectedRoute = (props) => {
  console.log("protected route is created");
  const jwtToken = Cookie.get("jwt_token");
  if (jwtToken === undefined) {
    return <Redirect to="/login" />;
  }
  return <Route {...props} />;
};
export default ProtectedRoute;
