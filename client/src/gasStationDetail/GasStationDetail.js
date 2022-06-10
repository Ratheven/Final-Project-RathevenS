import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";
import GasStationPost from "./GasStationPost";
import DeletPost from "./DeletePost";
import { useAuth0 } from "@auth0/auth0-react";
import UpdateGas from "./UpdateGas";

const GasStationDetail = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { id } = useParams();
  const [selectedStation, setSelectedStation] = useState();
  const [status, setStatus] = useState("loading");
  const [like, setLike] = useState();
  const [posted, setPosted] = useState(false);

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
  }, [posted]);

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
          {isAuthenticated && <UpdateGas id={id}/>}
          <button
            onClick={(e) => {
              setLike(like + 1);
            }}
          >
            like
          </button>{" "}
          <span>{like}</span>
          <div>
            <GasStationPost id={id} setPosted={setPosted} />
            {selectedStation.review.map((post) => {
              return (
                <Wrapper>
                  {/* if the user name from auth o match post.displayname render the delet button */}
                  <DeletPost _id={id} id={post.id} setPosted={setPosted} />
                  <p>{post.displayName}</p>
                  <p>{post.posted}</p>
                  <p>{post.post}</p>
                </Wrapper>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

const Wrapper = styled.div`
  border: 1px solid black;
`;
const Logo = styled.img`
  width: 50px;
  height: 50px;
`;
export default GasStationDetail;
