import { useState } from "react";
import styled from "styled-components";
import { BsPencilFill } from "react-icons/bs";

const UpdateGas = ({ id, setPosted }) => {
  const [price, setPrice] = useState();

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
