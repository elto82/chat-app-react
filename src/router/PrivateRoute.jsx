// import { Navigate, Route } from "react-router-dom";

// export const PrivateRoute = ({ isAuthenticated, element: Element, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       element={(props) =>
//         isAuthenticated ? (
//           <Element {...props} />
//         ) : (
//           <Navigate to="/auth" replace />
//         )
//       }
//     />
//   );
// };