// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';
// import React from 'react';
// import { BrowserRouter as Router, Switch } from 'react-router-dom';
// import RoleBasedRoute from './components/RoleBasedRoute';
// import Home from './components/Home';
// import AdminDashboard from './components/AdminDashboard';
// import UserDashboard from './components/UserDashboard';
// import Unauthorized from './components/Unauthorized';

// const RoleBasedRoute = ({ component: Component, role, ...rest }) => {
//     // Get the user's role from your authentication system
//     const userRole = getUserRole(); // Replace with your own logic to get the user's role

//     // Render the component based on the user's role
//     return (
//         <Route
//             {...rest}
//             render={(props) =>
//                 userRole === role ? (
//                     <Component {...props} />
//                 ) : (
//                     <Redirect to="/login" />
//                 )
//             }
//         />
//     );
// };

// // export default RoleBasedRoute;
// const App = () => {
//     return (
//         <Router>
//             <Switch>
//                 <RoleBasedRoute
//                     exact
//                     path="/"
//                     component={Home}
//                     role="guest"
//                 />
//                 <RoleBasedRoute
//                     path="/admin"
//                     component={AdminDashboard}
//                     role="admin"
//                 />
//                 <RoleBasedRoute
//                     path="/user"
//                     component={UserDashboard}
//                     role="user"
//                 />
//                 <Route path="/unauthorized" component={Unauthorized} />
//             </Switch>
//         </Router>
//     );
// };

// export default App;