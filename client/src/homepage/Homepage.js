import { useEffect, useState } from "react";
import FilterBar from "./FilterBar";
import MiniMap from "./MiniMap";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import FavouriteBar from "./FavouriteBar";

const Homepage = () => {
  //store all gas station data//
  const [gasStation, setGasStation] = useState();
  //to let us know if the status is good to go ahead for the next step//
  const [status, setStatus] = useState("loading");
  //store what filter type was chosen//
  const [filter, setFilter] = useState("Reset");
  //Auth0//
  const { user, isAuthenticated } = useAuth0();
  //grab data from the backend//
  useEffect(() => {
    fetch(`/api/gasStation?filter=${filter}`)
      .then((res) => res.json())
      .then((data) => {
        //store data in gasStation//
        setGasStation(data.data);
        //change out status//
        setStatus("idle");
      });
  }, [filter]);
  //Post a new user//
  useEffect(() => {
    if (isAuthenticated) {
      fetch(`/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          user,
        }),
      });
    }
  }, [isAuthenticated]);

  return (
    <>
      {status === "idle" && (
        <Container>
          {/* pass gasStation as a prop */}
          <MiniMap gasStation={gasStation} />
          <Div>
            {/* pass what type of filter as a prop */}
            <FilterBar setFilter={setFilter} />
            <FavouriteBar />
          </Div>
        </Container>
      )}
    </>
  );
};
const Div = styled.div`
  position: absolute;
  float: right;
`;
const Container = styled.div`
  display: flex;
`;
export default Homepage;
