import React, { useState } from "react";
import "./../styles.css";
import styled from "styled-components";
import TeamsPage from "./TeamsPage/TeamsPage";
import TeamPage from "./TeamPage/TeamPage";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";


// number of teams available on api is approx. 10000
const numOfTeams = 10000;
let teams_routes = [];
for (let i = 1; i < numOfTeams + 1; i++) {
  teams_routes.push(
    <Route
      key={i}
      path={"/teams/".concat(i.toString())}
      render={(props) => <TeamPage {...props} teamId={i} />}
    />
  );
}


// defiening apiParams for children components
const apiParams = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "387cf3f70dmshab804195baa213dp131564jsne25a989ec836",
    "x-rapidapi-host": "api-football-v1.p.rapidapi.com"
  }
};
export const ApiContext = React.createContext({});


const AppHeadline = styled.h1`
  font-size: 2em;
  text-align: center;
  color: blue;
  background-color: black;
  font-weight: bold;
`;


function App() {
  return (
    <div className="App">
      <AppHeadline>Football App</AppHeadline>
      <ApiContext.Provider value={apiParams}>
        <Router>
          <Switch>
            <Redirect exact from="/" to="/teams"/>
            <Route path="/teams" exact>
              <TeamsPage />
            </Route>
            {teams_routes}
          </Switch>
        </Router>
      </ApiContext.Provider>
    </div>
  );
}

export default App;
