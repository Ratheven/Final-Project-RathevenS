import { BrowserRouter, Switch, Route } from "react-router-dom";
import GasStationDetail from "./gasStationDetail/GasStationDetail";
import GlobalStyles from "./GlobalStyles";
import Header from "./homepage/header/Header";
import Homepage from "./homepage/Homepage";
import Profile from "./homepage/header/Profile";
import Hero from "./Hero";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />

      <Switch>
        <Route exact path="/">
          <Hero />
        </Route>
        <Route exact path="/homepage">
          <Header />
          <Homepage />
        </Route>

        <Route path="/gasStation/:id">
          <Header />
          <GasStationDetail />
        </Route>
        <Route path="/profile">
          <Header />
          <Profile />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
