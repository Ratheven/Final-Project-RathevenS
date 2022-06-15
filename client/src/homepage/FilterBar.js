import styled from "styled-components";

const FilterBar = ({ setFilter }) => {
  return (
    <>
      <FilteredForm>
        <Filter>Filter by Company </Filter>
        <InputWrapper>
          <input
            type="radio"
            name="gas"
            value="Shell"
            onChange={(e) => setFilter(e.target.value)}
          />
          <label>Shell</label>
        </InputWrapper>

        <InputWrapper>
          <input
            type="radio"
            name="gas"
            value="Ultramar"
            onChange={(e) => setFilter(e.target.value)}
          />
          <label>Ultramar</label>
        </InputWrapper>
        <InputWrapper>
          <input
            type="radio"
            name="gas"
            value="Esso"
            onChange={(e) => setFilter(e.target.value)}
          />
          <label>Esso</label>
        </InputWrapper>
        <InputWrapper>
          <input
            type="radio"
            name="gas"
            value="Couche-Tard"
            onChange={(e) => setFilter(e.target.value)}
          />
          <label>Couche-Tard</label>
        </InputWrapper>
        {/* <input
          type="radio"
          name="gas"
          value="Reset"
          onChange={(e) => setFilter(e.target.value)}
        />
        <label>Reset filter</label> */}

        <ResetButton value="Reset" onClick={(e) => setFilter(e.target.value)}>
          Reset Filter
        </ResetButton>
      </FilteredForm>
    </>
  );
};

const Filter = styled.h3`
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
`;

const FilteredForm = styled.form`
background-color: white;
  margin: 20px 0 0 20px;
  border: 1px solid black;
  border-radius: 15px;
  width: fit-content;
  block-size: fit-content;
  width: 208px;
  padding: 15px;
  
`;

const InputWrapper = styled.div`
  margin-bottom: 10px;
`;

const ResetButton = styled.button`
  border: none;
  border-radius: 5px;

  background: #92b5bf;
  color: #161b21;
  text-decoration: none;
  font-size: 1rem;
  height: 2.3rem;
  margin-right: 20px;
  margin-left: 20px;
  transition: all 300ms ease-in-out;
  cursor: pointer;
  padding: 0 20px;
  &:hover {
    background-color: #ffffff;
    color: #00515c;
    border: 1px solid #161b21;
  }
`;
export default FilterBar;
