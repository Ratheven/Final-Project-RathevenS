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
        displayPic: user.picture,
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
          placeholder=" Highlight your experience"
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />
        <ButtonDiv>
          <PostButton type="submit">Post</PostButton>
        </ButtonDiv>
      </form>
    </PostWrapper>
  );
};
const PostWrapper = styled.div`
  margin-top: 20px;
`;
const SpanKey = styled.span`
  font-weight: bold;
`;
const RequireSpan = styled.span`
  color: gray;
  font-size: 13px;
`;
const Post = styled.textarea`
  margin-top: 10px;
  height: 100px;
  width: 70vw;
  margin-left: 2px;
  border-radius: 17px;

  &:focus {
    border: 4px solid blue;
  }
`;
const ButtonDiv = styled.div`

  display: flex;
  justify-content: flex-end;
`;

const PostButton = styled.button`
border: none;
  border-radius: 5px;
  background: #92b5bf;
  color: #161B21;
  text-decoration: none;
  font-size: 1rem;
  height: 1.7rem;
  transition: all 300ms ease-in-out;
  cursor: pointer;
  padding: 0 20px;
  &:hover {
    background-color: #ffffff;
    color: #00515c;
  }
`;
export default GasStationPost;
