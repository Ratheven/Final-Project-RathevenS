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
  const { isAuthenticated } = useAuth0();
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
    <>
      {status === "loading" ? (
        <CircularWrapper>
          <CircularProgress />
        </CircularWrapper>
      ) : (
        <DetailContainer>
          <DetailWrapper>
            <GasStationDescription
              selectedStation={selectedStation}
              isAuthenticated={isAuthenticated}
              id={id}
              setPosted={setPosted}
            />
          </DetailWrapper>
          <StarWrapper>
            <RatingDiv>
              <StarRating setRating={setRating} rating={rating} />
            </RatingDiv>
          </StarWrapper>
          <div>
            {isAuthenticated && (
              <GasStationCreatePost
                id={id}
                setPosted={setPosted}
                rating={rating}
                setRating={setRating}
              />
            )}
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
