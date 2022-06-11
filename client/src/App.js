import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Authentication from "./authentication/Authentication";
import GasStationDetail from "./gasStationDetail/GasStationDetail";
import GlobalStyles from "./GlobalStyles";
import Header from "./homepage/header/Header";
import Homepage from "./homepage/Homepage";
import Profile from "./homepage/header/Profile";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />

      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>

        <Route exact path="/login">
          <Authentication />
        </Route>

        <Route path="/gasStation/:id">
          <GasStationDetail  />
        </Route>
        <Route path="/profile">
          <Profile/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
