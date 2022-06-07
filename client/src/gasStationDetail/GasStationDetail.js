import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

const GasStationDetail = () => {
  const { id } = useParams();
  const [selectedStation, setSelectedStation] = useState();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch(`/api/gasStation/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSelectedStation(data.data);
        setStatus("idle");
      });
  }, [id]);

  return (
    <div>
      {status === "loading" ? (
        <CircularProgress />
      ) : (
        <>
          hello
          <p>{selectedStation.name}</p>
          <p>{selectedStation.address}</p>
          <p>{selectedStation.gasPrice}</p>
        </>
      )}
    </div>
  );
};
export default GasStationDetail;
