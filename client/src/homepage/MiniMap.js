import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const MiniMap = ({ gasStation }) => {
  const [viewport, setViewport] = useState({
    latitude: 45.508888,
    longitude: -73.561668,
    width: "80vw",
    height: "90vh",
    zoom: 8.7,
  });

  const [selectedStation, setSelectedStation] = useState(null);

  //   useEffect =
  //     (() => {
  //       const listener = (e) => {
  //         if (e.key === "Escape") {
  //           setSelectedStation(null);
  //         }
  //       };
  //       window.addEventListener("keydown", listener);
  //       return () => {
  //         window.removeEventListener("keydown", listener);
  //       };
  //     },
  //     []);

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/ratheven/cl421lmz4000x15mh9j544ajb"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        {gasStation.map((gas, index) => {
          //   console.log(gas.cordinates[1], "this is the gas station");
          // console.log(gas, "this is gas");
          return (
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
              >
                {/* {if(gas.name=== "Couche-Tard"){
                  return(

                    <img src="/asset/coucheTard.png"/>
                  )
                }} */}
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

        {selectedStation && (
          <Popup
            latitude={selectedStation.cordinates[1]}
            longitude={selectedStation.cordinates[0]}
            onClose={() => {
              setSelectedStation(null);
            }}
          >
            <div>
              <PopupContainer>
                {selectedStation.name === "Couche-Tard" ? (
                  <Logo src="/asset/coucheTard.png" />
                ) : selectedStation.name === "Esso" ? (
                  <Logo src="/asset/esso.jpg" />
                ) : selectedStation.name === "Ultramar" ? (
                  <Logo src="/asset/ultramar.png" />
                ) : selectedStation.name === "Shell" ? (
                  <Logo src="/asset/shell.jpg" />
                ) : null}
                <NavLink to={`/gasStation/${selectedStation._id}`}>
                  <StationName>{selectedStation.name}</StationName>
                </NavLink>
              </PopupContainer>

              <span>
                Address:
                <p>{selectedStation.address}</p>
                <p>{selectedStation.gasPrice}</p>
              </span>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
};
const Gaz = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const Logo = styled.img`
  width: 20px;
  border-radius: 20px;
`;

const PopupContainer = styled.div`
  display: flex;
`;

const StationName = styled.h2`
  margin-left: 10px;
`;

export default MiniMap;
