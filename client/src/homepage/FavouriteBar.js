import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import styled from "styled-components";

const FavouriteBar = () => {
  const [favouriteStation, setFavouriteStation] = useState();
  const [status, setStatus] = useState("loading");
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      fetch(`/user/${user.sub}`)
        .then((res) => res.json())
        .then((data) => {
          setFavouriteStation(data.data);
          setStatus("idle");
        });
    }
  }, [isAuthenticated]);

  if (status === "idle") {
    return (
      <FavouriteContainer>
        <Favourite>Favourite Gas Station</Favourite>
        {favouriteStation.map((station, index) => {
          return (
            <Wrapper key={index}>
              {favouriteStation.length === [] ? (
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
`;
const Favourite = styled.h3`
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
`;
const FavouriteContainer = styled.div`
  background-color: white;
  margin: 20px 0 0 20px;
  border: 1px solid black;
  border-radius: 15px;
  width: fit-content;
  block-size: fit-content;
  width: 208px;
  padding: 15px;
`;
const Wrapper = styled.div`
  display: flex;
`;
const Img = styled.img`
  border-radius: 50%;
  width: 60px;
`;
const DisplayName = styled.p`
  font-weight: bold;
  margin-bottom: 3px;
`;
export default FavouriteBar;
