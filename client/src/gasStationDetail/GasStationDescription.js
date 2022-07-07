import styled from "styled-components";
import UpdateGas from "./UpdateGas";
import AddFavoriteStation from "./AddFavoriteStation";

const GasStationDescription = ({selectedStation, isAuthenticated, id,setPosted})=> {
    return(
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
              {isAuthenticated && <UpdateGas id={id} setPosted={setPosted} />}
              <AddFavoriteStation _id={selectedStation._id} />
            </GasDescriptionWrapper>
        </>
    )
}
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

export default GasStationDescription