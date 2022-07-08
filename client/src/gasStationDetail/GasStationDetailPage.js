import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";
import GasStationCreatePost from "./GasStationCreatePost";
import { useAuth0 } from "@auth0/auth0-react";
import StarRating from "./StarRating";
import GasStationDescription from "./GasStationDescription";
import GasStationReview from "./GasStationReview";

const GasStationDetailPage = () => {
  //grab isAuthenticated from Auth0
  const { isAuthenticated } = useAuth0();
  //grab gas station id from the URL
  const { id } = useParams();
  //store the specific gas station 
  const [selectedStation, setSelectedStation] = useState();
  //status
  const [status, setStatus] = useState("loading");
  //we use this to trigger the useEffect
  const [posted, setPosted] = useState(false);
  //we use this to store the star rating value
  const [rating, setRating] = useState(null);
  
  //we fetch the data by passing the id as a params to the backend
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
    <>
      {/* if status is loading produce the react Icon */}
      {status === "loading" ? (
        <CircularWrapper>
          <CircularProgress />
        </CircularWrapper>
      ) : (
        // if status is idle produce the following
        <DetailContainer>
          <DetailWrapper>
            {/* the description of the specific gas station */}
            <GasStationDescription
              selectedStation={selectedStation}
              isAuthenticated={isAuthenticated}
              id={id}
              setPosted={setPosted}
            />
          </DetailWrapper>
          <StarWrapper>
            <RatingDiv>
              {/* rating star system */}
              <StarRating setRating={setRating} rating={rating} />
            </RatingDiv>
          </StarWrapper>
          <div>
            {/* create a post  */}
            {isAuthenticated && (
              <GasStationCreatePost
                id={id}
                setPosted={setPosted}
                rating={rating}
                setRating={setRating}
              />
            )}
            {/* all the reviews in the specific gas station */}
            <GasStationReview
              selectedStation={selectedStation}
              id={id}
              setPosted={setPosted}
            />
          </div>
        </DetailContainer>
      )}
    </>
  );
};
const CircularWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RatingDiv = styled.div`
  margin: 10px 0 10px 0;
`;
const StarWrapper = styled.div`
  border-bottom: 1px solid lightgrey;
  margin: 50px 0 50px 0;
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
export default GasStationDetailPage;
