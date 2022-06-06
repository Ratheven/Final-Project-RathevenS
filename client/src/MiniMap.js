import { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import gasStation from "./data";
import gasimg from "./";
import styled from "styled-components";

const MiniMap = () => {
  const [viewport, setViewport] = useState({
    latitude: 45.508888,
    longitude: -73.561668,
    width: "100vw",
    height: "50vh",
    zoom: 10,
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
        mapboxApiAccessToken="pk.eyJ1IjoicmF0aGV2ZW4iLCJhIjoiY2wzcWltdTQxMGZ4aTNkcWVtcmZ3ODA3eCJ9.Kz57auU7agn-ScTVP65hEw"
        mapStyle="mapbox://styles/ratheven/cl421lmz4000x15mh9j544ajb"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        {gasStation.map((gas, index) => {
          //   console.log(gas.cordinates[1], "this is the gas station");
          return (
            <Marker
              key={index}
              latitude={gas.cordinates[1]}
              longitude={gas.cordinates[0]}
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedStation(gas);
                }}
              >
                gas
              </button>
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
              <h2>{selectedStation.name}</h2>
              <h3>{selectedStation.address}</h3>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );

  //   const GazIcon = styled.button`
  //     background: none;
  //     border: none;
  //     cursor: pointer;
  //   `;
};

export default MiniMap;