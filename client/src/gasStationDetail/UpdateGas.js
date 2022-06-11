import { useState } from "react";

const UpdateGas = ({ id, setPosted }) => {
  const [price, setPrice] = useState();

  const updatePrice = () => {
    console.log("kiki", id);
    console.log(price, "updatedPirce");
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
        <input
          type="number"
          placeholder="updateGasPrice"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        ></input>
        <button type="submit">Post</button>
      </form>
    </>
  );
};
export default UpdateGas;
