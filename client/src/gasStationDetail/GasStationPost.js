import {  useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import moment from "moment";

import styled from "styled-components";

const uuid = require("uuid");

const GasStationPost = ({ id, setPosted }) => {
  const [post, setPost] = useState("");
  const { user } = useAuth0();

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
    setPost("")
  };

  return (
    <>
      <form
      
        type="submit"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
          // form.reset()
        }}
      >
        <Post
          type="text"
          placeholder="Create a Post"
          value={post}
          onChange={(e) => setPost(e.target.value)}
        ></Post>
        <PostButton type="submit">Post</PostButton>
      </form>
    </>
  );
};

const Post = styled.input`
height: 40px;
width: 70vw;
  margin-left: 2px;
  border: none;
  &:focus {
    border: 1px solid #21abd4;
    border-radius: 5px;
  }
  /* :focus + button {
    visibility: visible;
  } */
`;

const PostButton = styled.button`
margin-left: -50px;
  /* visibility: hidden; */
  border: none;
 
`;
export default GasStationPost;
