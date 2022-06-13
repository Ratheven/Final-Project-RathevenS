import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import moment from "moment";

import styled from "styled-components";

const uuid = require("uuid");

const GasStationPost = ({ id, setPosted, rating, setRating }) => {
  const [post, setPost] = useState("");

  const { user } = useAuth0();

  const time = moment().format("LL");

  const postId = uuid.v4();

  const handleSubmit = () => {
    // console.log(user, "this is the rating");
    fetch("/post/createPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _id: id,
        id: postId,
        email: user.email,
        displayName: user.name,
        posted: time,
        post: post,
        stars: rating,
        displayPic: user.picture
      }),
    }).then(setPosted((prev) => !prev));
    setPost("");
    setRating(null);
  };

  return (
    <PostWrapper>
    <SpanKey>
              Rate Your Experience<RequireSpan> (required)</RequireSpan>
            </SpanKey>
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
          placeholder="Highlight your experience"
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />
        <PostButton type="submit">Post</PostButton>
      </form>
    </PostWrapper>
  );
};
const PostWrapper = styled.div`
margin-top: 20px;
`
const SpanKey = styled.span`
  font-weight: bold;
`;
const RequireSpan = styled.span`
  color: gray;
  font-size: 13px;
`;
const Post = styled.input`
margin-top: 10px;
  height: 100px;
  width: 70vw;
  margin-left: 2px;
  border-radius: 17px;
 
  &:focus {
    border: 4px solid blue;
   
  }
 
`;

const PostButton = styled.button`
  margin-left: -50px;
  /* visibility: hidden; */
  border: none;
`;
export default GasStationPost;
