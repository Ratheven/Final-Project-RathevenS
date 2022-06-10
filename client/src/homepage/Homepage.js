import { useEffect, useState } from "react";
import FilterBar from "./FilterBar";
import MiniMap from "./MiniMap";
import BestPrice from "./BestPrice";

const Homepage = () => {
  const [gasStation, setGasStation] = useState();
  const [status, setStatus] = useState("loading");
  const [filter, setFilter] = useState("Reset");

  useEffect(() => {
    fetch(`/api/gasStation?filter=${filter}`)
      .then((res) => res.json())
      .then((data) => {
        setGasStation(data.data);
        setStatus("idle");
      });
  }, [filter]);

  return (
    <>
      {status === "idle" && (
        <>
          <FilterBar setFilter={setFilter} />
          <MiniMap gasStation={gasStation} />
          {/* <BestPrice /> */}
        </>
      )}
    </>
  );
};

export default Homepage;
