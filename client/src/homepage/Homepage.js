import { useEffect, useState } from "react";
import FilterBar from "./FilterBar";
import MiniMap from "./MiniMap";

const Homepage = () => {
  const [gasStation, setGasStation] = useState();
  const [status, setStatus] = useState("loading");
  const [filter, setFilter] = useState();
  // console.log(filter,"filtere")

  useEffect(() => {
    fetch(`/api/gasStation?filter=${filter}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setGasStation(data.data);
        setStatus("idle");
      });
  }, [filter?filter:null]);

  return (
    <>
      {status === "idle" && (
        <>
          <FilterBar setFilter={setFilter} />
          <MiniMap gasStation={gasStation} />
        </>
      )}
    </>
  );
};

export default Homepage;
