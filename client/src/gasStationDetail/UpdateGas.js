const UpdateGas = ({ id }) => {
  const updatePrice = () => {
    console.log("kiki", id);
    fetch(`/bestPrice/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  };

  return (
    <>
      <button onClick={() => updatePrice()}>UpdatePrice</button>
    </>
  );
};
export default UpdateGas;
