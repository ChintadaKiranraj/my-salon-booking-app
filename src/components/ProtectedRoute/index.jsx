import { Redirect, Route } from "react-router-dom";
import Cookie from "js-cookie";
import Header from "../Header/header";

const ProtectedRoute = (props) => {
  const jwtToken = Cookie.get("jwt_token");
  if (jwtToken === undefined) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <Header />
      <Route {...props} />
    </>
  );
};
export default ProtectedRoute;
