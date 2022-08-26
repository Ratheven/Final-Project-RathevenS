import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import styled from "styled-components";

const FavouriteBar = () => {
  //saves users favourite gas station//
  const [favouriteStation, setFavouriteStation] = useState();
  //loading//
  const [status, setStatus] = useState("loading");
  //auth0//
  const { user, isAuthenticated } = useAuth0();
  //if the user is authenticated, we pass the user specific sub number and retrieve their favourite gas stations//
  useEffect(() => {
    if (isAuthenticated) {
      fetch(`/user/${user.sub}`)
        .then((res) => res.json())
        .then((data) => {
          //saves data in favouriteStation//
          setFavouriteStation(data.data);
          setStatus("idle");
        });
    }
  }, [isAuthenticated]);

  if (status === "idle") {
    return (
      <FavouriteContainer>
        <Favourite>Favourite Gas Station</Favourite>
        {/* display favourite gas station */}
        {favouriteStation.map((station, index) => {
          return (
            <Wrapper key={index}>
              {/* if favouriteStation is empty it will display add a gas station */}
              {favouriteStation.length === 0 ? (
                <div>Add a Gas Station</div>
              ) : (
                <>
                  <Img src={station.logo} />
                  <DivWrapper>
                    <DisplayName>{station.name}</DisplayName>
                    <Price>
                      Gas Price: <span>{station.gasPrice}</span>
                    </Price>
                  </DivWrapper>
                </>
              )}
            </Wrapper>
          );
        })}
      </FavouriteContainer>
    );
  }
};
const DivWrapper = styled.div`
  margin-top: 5px;
  margin-left: 1px;
`;
const Price = styled.p`
  font-weight: bold;
  font-size: 17px;
  margin-top: 5px;

`;
const Favourite = styled.h3`
  font-size: 20px;
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
`;
const FavouriteContainer = styled.div`
  background-color: white;
  margin: 20px 0 0 20px;
  border: 1px solid black;
  border-radius: 15px;
  block-size: fit-content;
  width: 270px;
  padding: 15px;
`;
const Wrapper = styled.div`
  display: flex;
  margin-top: 8px;
`;
const Img = styled.img`
  border-radius: 50%;
  width: 60px;
`;
const DisplayName = styled.p`
  font-weight: bold;
  margin-bottom: 3px;
  font-size: 20px;
`;
export default FavouriteBar;
