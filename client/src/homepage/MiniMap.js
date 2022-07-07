import { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const MiniMap = ({ gasStation }) => {
  //viewport information we need to render the map//
  const [viewport, setViewport] = useState({
    container: "map", // container ID
    latitude: 45.508888,
    longitude: -73.561668,
    width: "100vw",
    height: "100vh",
    zoom: 9.2,
  });
  //navigates to the gas station detail page//
  let history = useHistory();
  //after clicking on a location icon, useState save that particular gas station //
  const [selectedStation, setSelectedStation] = useState(null);
  //press escape to cancel popup//
  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedStation(null);
      }
    };
    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);
  //still working on the current position//
  let current = [];
  const successLocation = (position) => {
    current = [position.coords.longitude, position.coords.latitude];
  };
  const errorLocation = () => {};
  return (
    <div>
      {/* Render the map by grabing our viewport, .env and map style */}
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/ratheven/cl421lmz4000x15mh9j544ajb"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        {navigator.geolocation.getCurrentPosition(
          successLocation,
          errorLocation,
          {
            enableHighAccuracy: true,
          }
        )}
        {/* Render the data to show on the map which is being passed down by the homepage */}
        {gasStation.map((gas, index) => {
          return (
            // Marker for each individual gas station
            <Marker
              key={index}
              latitude={gas.cordinates[1]}
              longitude={gas.cordinates[0]}
            >
              <Gaz
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedStation(gas);
                }}
                className="animate__bounce"
              >
                {/* display logo to represent each station */}
                {gas.name === "Couche-Tard" ? (
                  <Logo src="/asset/coucheTard.png" />
                ) : gas.name === "Esso" ? (
                  <Logo src="/asset/esso.jpg" />
                ) : gas.name === "Ultramar" ? (
                  <Logo src="/asset/ultramar.png" />
                ) : gas.name === "Shell" ? (
                  <Logo src="/asset/shell.jpg" />
                ) : null}
              </Gaz>
            </Marker>
          );
        })}
        {/* once the logo is clicked we grab the data from our useState */}
        {selectedStation && (
          <Popup
            latitude={selectedStation.cordinates[1]}
            longitude={selectedStation.cordinates[0]}
            onClose={() => {
              setSelectedStation(null);
            }}
          >
            <div>
              <PopupHeader>
                {/* display logo to represent each station */}
                {selectedStation.name === "Couche-Tard" ? (
                  <p className="animate__bounce">
                    <Logo src="/asset/coucheTard.png" />
                  </p>
                ) : selectedStation.name === "Esso" ? (
                  <Logo src="/asset/esso.jpg" />
                ) : selectedStation.name === "Ultramar" ? (
                  <Logo src="/asset/ultramar.png" />
                ) : selectedStation.name === "Shell" ? (
                  <Logo src="/asset/shell.jpg" />
                ) : null}

                <StationName>{selectedStation.name}</StationName>
              </PopupHeader>

              <div>
                <KeyValue>
                  <KeyWord>Address: </KeyWord>
                  {selectedStation.address}
                </KeyValue>
                <KeyValue>
                  <KeyWord>Gas Price: </KeyWord>
                  {selectedStation.gasPrice}
                </KeyValue>
              </div>
              <PopupButton>
                {/* Once you click on either button on the popup it redirects you to the gaz station detail page */}
                <Button
                  onClick={() =>
                    history.push(`/gasStation/${selectedStation._id}`)
                  }
                >
                  Update Gas Price
                </Button>
                <Button
                  onClick={() =>
                    history.push(`/gasStation/${selectedStation._id}`)
                  }
                >
                  Leave a Review
                </Button>
              </PopupButton>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
};
const Button = styled.button`
  width: 50%;
  border: none;
  border: 1px solid #161b21;
  background: #92b5bf;
  color: #161b21;
  font-size: 1rem;
  height: 2.3rem;
  transition: all 300ms ease-in-out;
  cursor: pointer;
  padding: 0 20px;
  &:hover {
    background-color: #ffffff;
    color: #00515c;
    border: 1px solid #161b21;
  }
`;
const PopupButton = styled.div``;
const KeyValue = styled.p`
  padding: 10px 0 10px 0;
`;
const KeyWord = styled.span`
  font-weight: bold;
`;
const Gaz = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const Logo = styled.img`
  width: 30px;
  border-radius: 20px;
`;

const PopupHeader = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid black;
  padding-bottom: 5px;
`;

const StationName = styled.h2`
  margin-left: 10px;
  font-size: 30px;
`;

export default MiniMap;
