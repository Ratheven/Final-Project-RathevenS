import { BrowserRouter, Switch, Route } from "react-router-dom";
import GasStationDetailPage from "./gasStationDetail/GasStationDetailPage";
import GlobalStyles from "./GlobalStyles";
import Header from "./header/Header";
import Homepage from "./homepage/Homepage";
import Profile from "./header/Profile";
import Hero from "./heroPage/Hero";

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
          <GasStationDetailPage />
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
