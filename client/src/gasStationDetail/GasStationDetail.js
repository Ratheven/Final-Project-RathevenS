import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";
import GasStationPost from "./GasStationPost";
import DeletPost from "./DeletePost";
import { useAuth0 } from "@auth0/auth0-react";
import UpdateGas from "./UpdateGas";
import Star from "./Star";
import StarRating from "./StarRating";
import AddFavoriteStation from "./AddFavoriteStation";

const GasStationDetail = () => {
  const { user, isAuthenticated } = useAuth0();
  const { id } = useParams();
  const [selectedStation, setSelectedStation] = useState();
  const [status, setStatus] = useState("loading");
  const [posted, setPosted] = useState(false);
  const [rating, setRating] = useState(null);
 
  useEffect(() => {
    if (id) {
      fetch(`/api/gasStation/${id}`)
        .then((res) => res.json())
        .then((data) => {
    
          setSelectedStation(data.data);
          setStatus("idle");
        });
    }
  }, [posted]);

 

  return (
    <div>
      {status === "loading" ? (
        <CircularWrapper>
          <CircularProgress />
        </CircularWrapper>
      ) : (
        <DetailContainer>
          <DetailWrapper>
            <div>
              <Logo src={selectedStation.logo} />
            </div>
            <GasDescriptionWrapper>
              <LogoName>{selectedStation.name}</LogoName>
              <DataWrapper>
                <SpanKey>Address: </SpanKey>
                {selectedStation.address}
              </DataWrapper>
              <DataWrapper>
                <SpanKey>Gas Price: </SpanKey>
                {selectedStation.gasPrice}
              </DataWrapper>
              {isAuthenticated && <UpdateGas id={id} setPosted={setPosted} />}
              <AddFavoriteStation _id={selectedStation._id} />
            </GasDescriptionWrapper>
          </DetailWrapper>
          <StarWrapper>
            <SpanKey>
              Rate Your Experience<RequireSpan> (required)</RequireSpan>
            </SpanKey>
            <RatingDiv>
              <StarRating setRating={setRating} rating={rating} />
            </RatingDiv>
          </StarWrapper>

          <div>
            {isAuthenticated && (
              <GasStationPost
                id={id}
                setPosted={setPosted}
                rating={rating}
                setRating={setRating}
              />
            )}
            <Reviews>Recent Reviews</Reviews>
            {selectedStation.review.map((post, index) => {
              return (
                <PostContainer key={index}>
                  <ReviewHeader>
                   

                    <Wrapper>
                      <div>
                        <AvatarImg src={post.displayPic} />
                      </div>
                      <div>
                        <DisplayName>{post.displayName}</DisplayName>
                        <Date>{post.posted}</Date>
                      </div>
                    </Wrapper>
                    {isAuthenticated && post.email === user.email && (
                      <DeletPost _id={id} id={post.id} setPosted={setPosted} />
                    )}
                  </ReviewHeader>

                  <Star stars={post.stars} />
                  <Post>{post.post}</Post>
                </PostContainer>
              );
            })}
          </div>
        </DetailContainer>
      )}
    </div>
  );
};
const CircularWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
`

const PostContainer = styled.div`
background-color: #DCDFE1;
padding: 10px;
  border: 1px solid black;
  margin: 10px 0 10px 0;
  border-radius: 17px;
`;

const Post = styled.p`
  margin: 10px 0 10px 0;
`;
const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;
const Wrapper = styled.div`
  display: flex;
`;
const Reviews = styled.p`
  margin: 20px 0 10px 0;
  font-weight: bold;
  font-size: 13px;
`;
const RatingDiv = styled.div`
  margin: 10px 0 10px 0;
`;
const StarWrapper = styled.div`
  border-bottom: 1px solid lightgrey;
  margin: 50px 0 50px 0;
`;
const RequireSpan = styled.span`
  color: gray;
  font-size: 13px;
`;
const DataWrapper = styled.div`
  padding-top: 15px;
`;
const GasDescriptionWrapper = styled.div`
  margin: 20px 0 0 20px;
`;
const SpanKey = styled.span`
  font-weight: bold;
`;

const Date = styled.span`
  padding-left: 10px;
  position: relative;
 top: 20px;
 font-size: 12px;
`;
const DisplayName = styled.span`
  font-weight: bold;
  padding-right: 5px;
  padding-left: 10px;
 position: relative;
 top: 20px;
`;
const AvatarImg = styled.img`
  border-radius: 50%;
  width: 60px;
`;

const Logo = styled.img`
  width: 20vw;
  height: 35vh;
`;

const LogoName = styled.h4`
  font-size: 20px;
`;
const DetailContainer = styled.div`
  width: 70vw;
  justify-content: center;
  margin-left: 15vw;
  margin-top: 20px;
`;

const DetailWrapper = styled.div`
  display: flex;
`;
export default GasStationDetail;
