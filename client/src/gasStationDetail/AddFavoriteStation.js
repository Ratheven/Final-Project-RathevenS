import { useAuth0 } from "@auth0/auth0-react";
import { AiOutlineStar } from "react-icons/ai";
import styled from "styled-components";

//get unique _id from GasStationDetailPage//
const AddFavoriteStation = ({ _id }) => {
  
  //auth0 -user information//
  const { user,  } = useAuth0();

  //This fetch will update the user profile and add the gas station id in a array
  const handleFavorite = () => {
    fetch("/user/favoriteStations/add", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _id: _id,
        sub: user.sub,
      }),
    });
  };

  return (
    <Button onClick={() => handleFavorite()}>
      {/* React Icon */}
      <AiOutlineStar />
      Favourite
    </Button>
  );
};

const Button = styled.button`
  background-color: white;
  color: orange;
  font-weight: bold;
  margin-top: 13px;
  padding: 4px;
  border-radius: 10px;
  cursor: pointer;
`;
export default AddFavoriteStation;
