import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";
import GasStationPost from "./GasStationPost";
import DeletPost from "./DeletePost";
import { useAuth0 } from "@auth0/auth0-react";
import UpdateGas from "./UpdateGas";

const GasStationDetail = () => {
  const { isAuthenticated } = useAuth0();
  const { id } = useParams();
  const [selectedStation, setSelectedStation] = useState();
  const [status, setStatus] = useState("loading");
  const [posted, setPosted] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`/api/gasStation/${id}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setSelectedStation(data.data);
          setStatus("idle");
        });
    }
  }, [posted]);

  return (
    <div>
      {status === "loading" ? (
        <CircularProgress />
      ) : (
        <DetailContainer>
          <LogoName>{selectedStation.name}</LogoName>
          <DetailWrapper>
            <div>
              <p>Address:{selectedStation.address}</p>
              <p>{selectedStation.gasPrice}</p>
              {isAuthenticated && <UpdateGas id={id} />}
            </div>
            <div>
              <Logo src={selectedStation.logo} />
            </div>
          </DetailWrapper>
          <div>
            {isAuthenticated && (
              <GasStationPost id={id} setPosted={setPosted} />
            )}
            {selectedStation.review.map((post, index) => {
              return (
                <Container key={index}>
                  <DeletPost _id={id} id={post.id} setPosted={setPosted} />
                  <Wrapper>
                    {/* if the user name from auth o match post.displayname render the delet button */}
                    <ImgNameWrapper>
                      <AvatarImg src={post.displayPic} />
                    </ImgNameWrapper>
                    <div>
                      <DisplayName>{post.displayName}</DisplayName>
                      <Date>{post.posted}</Date>
                    </div>
                  </Wrapper>
                  <p>Rating: {post.stars}</p>
                  <p>{post.post}</p>
                </Container>
              );
            })}
          </div>
        </DetailContainer>
      )}
    </div>
  );
};
const Wrapper = styled.div`
  display: flex;
`;
const Container = styled.div`
  border: 1px solid black;
`;
const ImgNameWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Date = styled.span`
  padding-left: 10px;
`;
const DisplayName = styled.span`
  font-weight: bold;
  padding-right: 15px;
`;
const AvatarImg = styled.img`
  border-radius: 50%;
  width: 60px;
`;

const Logo = styled.img`
  width: 35vw;
  height: 35vh;
`;

const LogoName = styled.h1`
  font-size: 80px;
`;
const DetailContainer = styled.div`
  width: 70vw;
  justify-content: center;
`;

const DetailWrapper = styled.div`
  display: flex;
`;
export default GasStationDetail;
