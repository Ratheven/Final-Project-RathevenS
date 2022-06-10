import { useEffect, useState, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import moment from "moment";
import { v4 } from "uuid";
import { v4 as uuidv4 } from "uuid";

const uuid = require("uuid");

const GasStationPost = ({ id, setPosted }) => {
  const [post, setPost] = useState();
  const { user, isAuthenticated, isLoading } = useAuth0();

  const time = moment().format("LL");

  const postId = uuid.v4();

  const handleSubmit = () => {
    fetch("/post/createPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _id: id,
        id: postId,
        displayName: user.name,
        posted: time,
        post: post,
      }),
    }).then(setPosted((prev) => !prev));
  };

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
