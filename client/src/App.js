import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Authentication from "./Authentication";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import Homepage from "./Homepage";

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
      </Switch>
    </BrowserRouter>
  );
}

export default App;
