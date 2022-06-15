import { useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const SearchBar = () => {
  const [gasStation, setGasStation] = useState();
  const [status, setStatus] = useState("loading");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStations, setFilteredStations] = useState([]);
  let history = useHistory();

  const handleSearch = (e) => {
    setSearchTerm((state) => e.target.value);
    if (e.target.value !== "") {
      const searchResult = gasStation.filter((station) => {
        return (
          station.name.toLowerCase().search(searchTerm.toLowerCase()) !== -1
        );
      });
      setFilteredStations(searchResult);
    } else {
      setFilteredStations([]);
    }
  };

  useEffect(() => {
    fetch("/getAllGasStation")
      .then((res) => res.json())
      .then((data) => {
        setGasStation(data.data);
        setStatus("idle");
      });
  }, []);

  const handleLink = (id) => {
    history.push(`/gasStation/${id}`);
    setSearchTerm("");
    setFilteredStations([]);
  };

  if (status === "idle") {
    return (
      <Search>
        <SearchInput>
          <Input
            type="text"
            placeHolder="Search a station name"
            value={searchTerm}
            onChange={(e) => {
              handleSearch(e);
            }}
          />
          <SearchIcon>
            <AiOutlineSearch />
          </SearchIcon>
        </SearchInput>
        {filteredStations.length > 0 && (
          <InputDropdown style={{ zIndex: 100 }}>
            {filteredStations.map((station) => {
              return (
                <Wrapper onClick={() => handleLink(station._id)}>
                  <StationValue>{station.name}</StationValue>
                  <Address>{station.address}</Address>
                </Wrapper>
              );
            })}
          </InputDropdown>
        )}

        {/* <DataResult>
          {gasStation.map((value, index) => {
            return <div>{value.name}</div>;
          })}
        </DataResult> */}
      </Search>
    );
  }
};
const Wrapper = styled.div`
  border: 1px solid black;
`;
const Address = styled.div`
  font-size: 10px;
  padding-bottom: 5px;
`;
const StationValue = styled.div`
  width: 300px;
  padding: 10px;
  font-weight: bold;
`;
const InputDropdown = styled.div`
  z-index: 100000000000;
  background-color: white;
  position: absolute;
`;
const Input = styled.input`
  background-color: white;
  border: 0;
  border-top-right-radius: 0px;
  border-top-left-radius: 0px;
  border-radius: 2px;
  font-size: 18px;
  padding: 15px;
  height: 30px;
  width: 300px;
  &:focus {
    border: 2px solid blue;
  }
`;
const Search = styled.div`
  width: 100%;
  margin-left: 70px;
`;
const SearchInput = styled.div`
  margin-top: 10px;
  display: flex;
`;
const DataResult = styled.div``;

const SearchIcon = styled.div`
  height: 30px;
  width: 50px;
  background-color: white;
  display: grid;
  place-items: center;
`;
export default SearchBar;
