import { useState } from "react";
import styled from "styled-components";
import { BsPencilFill } from "react-icons/bs";

const UpdateGas = ({ id, setPosted }) => {
  //this stores the value of gas that we change through the input at the bottom
  const [price, setPrice] = useState();
  
  //oatch will update the data of the gas station to have the new gas price
  const updatePrice = () => {
    fetch("/bestPrice", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _id: id,
        gasPrice: price,
      }),
      //this will rerender the page 
    }).then(setPosted((prev) => !prev));
  };

  return (
    <>
      <form
        type="submit"
        onSubmit={(event) => {
          event.preventDefault();
          updatePrice();
        }}
      >
        <Input
          type="number"
          step="0.01"
          placeholder="Update Gas Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Button type="submit">
          {/* React Icon */}
          <BsPencilFill />
        </Button>
      </form>
    </>
  );
};

const Input = styled.input`
  width: 130px;
  border-radius: 8px;
  margin-top: 8px;
`;
const Button = styled.button`
  border: none;
  background: white;
`;

export default UpdateGas;
