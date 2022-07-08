import styled from "styled-components";
//receive setFilter from homepage//
const FilterBar = ({ setFilter }) => {
  return (
    <>
      {/* form */}
      <FilteredForm>
        <Filter>Filter by Company </Filter>
        {/* each radio input corresponds to a particular gas station */}
        <InputWrapper>
          <input
            type="radio"
            name="gas"
            value="Shell"
            onChange={(e) => setFilter(e.target.value)}
          />
          <Label>Shell</Label>
        </InputWrapper>

        <InputWrapper>
          <input
            type="radio"
            name="gas"
            value="Ultramar"
            onChange={(e) => setFilter(e.target.value)}
          />
          <Label>Ultramar</Label>
        </InputWrapper>
        <InputWrapper>
          <input
            type="radio"
            name="gas"
            value="Esso"
            onChange={(e) => setFilter(e.target.value)}
          />
          <Label>Esso</Label>
        </InputWrapper>
        <InputWrapper>
          <input
            type="radio"
            name="gas"
            value="Couche-Tard"
            onChange={(e) => setFilter(e.target.value)}
          />
          <Label>Couche-Tard</Label>
        </InputWrapper>
        <ResetButton value="Reset" onClick={(e) => setFilter(e.target.value)}>
          Reset Filter
        </ResetButton>
      </FilteredForm>
    </>
  );
};
const Label = styled.label`
  font-size: 22px;
`;
const Filter = styled.h3`
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
  font-size: 24px;
`;

const FilteredForm = styled.form`
  background-color: white;
  margin: 20px 0 0 20px;
  border: 1px solid black;
  border-radius: 15px;
  block-size: fit-content;
  width: 270px;
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
  font-size: 1.3rem;
  height: 2.3rem;
  margin-right: 20px;
  margin-left: 20%;
  margin: 20px 20px 0 20%;
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
