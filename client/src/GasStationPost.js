import { useEffect, useState, useContext } from "react";

const GasStationPost = ({ id }) => {
  const [post, setPost] = useState();

  const handleSubmit = () => {};
  return (
    <>
      <form
        type="submit"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          placeholder="First Name"
          value={post}
          onChange={(e) => setPost(e.target.value)}
        ></input>
        <button type="submit">Post</button>
      </form>
    </>
  );
};
export default GasStationPost;
