import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Authentication from "./authentication/Authentication";
import GasStationDetail from "./gasStationDetail/GasStationDetail";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import Homepage from "./homepage/Homepage";

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
      </Switch>
    </BrowserRouter>
  );
}

export default App;
