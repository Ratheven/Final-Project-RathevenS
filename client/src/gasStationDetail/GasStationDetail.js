import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";
import GasStationPost from "../GasStationPost";

const GasStationDetail = () => {
  const { id } = useParams();
  const [selectedStation, setSelectedStation] = useState();
  const [status, setStatus] = useState("loading");
  const [like, setLike] = useState();

  useEffect(() => {
    if (id) {
      fetch(`/api/gasStation/${id}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setSelectedStation(data.data);
          setStatus("idle");
          setLike(data.data.likes);
        });
    }
  }, [id]);

  return (
    <div>
      {status === "loading" ? (
        <CircularProgress />
      ) : (
        <>
          <Logo src={selectedStation.logo} />
          <p>{selectedStation.name}</p>
          <p>{selectedStation.address}</p>
          <p>{selectedStation.gasPrice}</p>
          <button
            onClick={(e) => {
              setLike(like + 1);
            }}
          >
            like
          </button>{" "}
          <span>{like}</span>
          <div>
            <GasStationPost id={id} />
            {selectedStation.review.map((post) => {
              return (
                <>
                  <p>{post.displayName}</p>
                  <p>{post.posted}</p>
                  <p>{post.post}</p>
                </>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

const Logo = styled.img`
  width: 50px;
  height: 50px;
`;
export default GasStationDetail;
