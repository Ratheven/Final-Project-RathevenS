import styled from "styled-components";
import UpdateGas from "./UpdateGas";
import AddFavoriteStation from "./AddFavoriteStation";

const GasStationDescription = ({
  selectedStation,
  isAuthenticated,
  id,
  setPosted,
}) => {
  //render all the description of the selected Station
  return (
    <>
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
        {/* if user is Authenticated the update functionality will appear */}
        {isAuthenticated && <UpdateGas id={id} setPosted={setPosted} />}
        {/* if user is Authenticated the favouritism functionality will appear */}
        {isAuthenticated && <AddFavoriteStation _id={selectedStation._id} />}
      </GasDescriptionWrapper>
    </>
  );
};
const Logo = styled.img`
  width: 20vw;
  height: 35vh;
`;
const GasDescriptionWrapper = styled.div`
  margin: 20px 0 0 20px;
`;
const LogoName = styled.h4`
  font-size: 20px;
`;
const DataWrapper = styled.div`
  padding-top: 15px;
`;
const SpanKey = styled.span`
  font-weight: bold;
`;

export default GasStationDescription;
