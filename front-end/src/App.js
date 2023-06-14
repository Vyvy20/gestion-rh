import React from 'react'
import { unstable_HistoryRouter as HistoryRouter , useRoutes } from "react-router-dom";
import { ApolloProvider, InMemoryCache, ApolloClient, ApolloLink, concat, HttpLink } from "@apollo/client";
import { createBrowserHistory } from 'history';
import MAP_ROUTES from "./routes";

const httpLink = new HttpLink({ uri: 'http://localhost:4000' });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || null,
    }
  }));
  return forward(operation);
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
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
