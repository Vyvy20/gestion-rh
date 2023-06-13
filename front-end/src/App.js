import React from 'react'
import { unstable_HistoryRouter as HistoryRouter , useRoutes } from "react-router-dom";
import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";
import { createBrowserHistory } from 'history';
import MAP_ROUTES from "./routes";

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
  headers: {
    authorization: localStorage.getItem("token")
  }
});

function AppRoutes() {
  const routesElem = useRoutes(MAP_ROUTES);
  return routesElem;
}

export default function App() {
  return (
    <div className="App"> 
        <ApolloProvider client={client}>
            <HistoryRouter history={createBrowserHistory()}>
                <AppRoutes />
            </HistoryRouter>
        </ApolloProvider>
    </div>
  )
}
