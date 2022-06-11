import styled from "styled-components";

const FilterBar = ({ setFilter }) => {
  return (
    <>
      <FilteredForm>
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
          <label>Ultramaur</label>
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

const FilteredForm = styled.form`
  margin: 20px 0 0 20px;
`;

const InputWrapper = styled.div`
margin-bottom: 10px;
`

const ResetButton = styled.button`
  border: none;
  border-radius: 5px;
  background: #626fe6;
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  height: 2.3rem;
  margin-right: 20px;

  transition: all 300ms ease-in-out;
  cursor: pointer;
  padding: 0 20px;
  &:hover {
    background-color: #fff;
    color: #626fe6;
    border: 1px solid #626fe6;
  }
`;
export default FilterBar;
