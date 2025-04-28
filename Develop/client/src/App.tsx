import "./App.css";
// ------ from lesson23 -------
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
// ------------

import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";

// -----from lesson23 ----
const httpLink = createHttpLink({
  uri: "/graphql",
});
// ------------

// ------STARTER CODE---------
// function App() {
//   return (
//     <>
//       <Navbar />
//       <Outlet />
//     </>
//   );
// }
// ---------------

// -------modified from lesson23-------
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="flex-column justify-flex-start min-100-vh">
        <Navbar />
        <div className="container">
          <Outlet />
        </div>
      </div>
    </ApolloProvider>
  );
}
// ---------------

export default App;
