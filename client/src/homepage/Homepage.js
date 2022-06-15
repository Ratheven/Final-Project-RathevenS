import { useEffect, useState } from "react";
import FilterBar from "./FilterBar";
import MiniMap from "./MiniMap";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import FavouriteBar from "./FavouriteBar";

const Homepage = () => {
  const [gasStation, setGasStation] = useState();
  const [status, setStatus] = useState("loading");
  const [filter, setFilter] = useState("Reset");
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    fetch(`/api/gasStation?filter=${filter}`)
      .then((res) => res.json())
      .then((data) => {
        setGasStation(data.data);
        setStatus("idle");
      });
  }, [filter]);

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
          <MiniMap gasStation={gasStation} />
          <Div>
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
`
const Container = styled.div`
  display: flex;
`;
export default Homepage;
