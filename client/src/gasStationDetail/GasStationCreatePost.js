import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import moment from "moment";
import styled from "styled-components";

const uuid = require("uuid");

const GasStationCreatePost = ({ id, setPosted, rating, setRating }) => {
  //saves the post 
  const [post, setPost] = useState("");
  //auth0 users information
  const { user } = useAuth0();
  //the time that was posted
  const time = moment().format("LL");
  //unique id number
  const postId = uuid.v4();
  
  //create post by using the post method
  const handleSubmit = () => {
    fetch("/post/createPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        //the id for the gas station
        _id: id,
        //generated id 
        id: postId,
        //auth0 user email
        email: user.email,
        //auth0 user name
        displayName: user.name,
        //time that the post was posted
        posted: time,
        //contents in the post
        post: post,
        //the number of stars that was chosen
        stars: rating,
        //display picture
        displayPic: user.picture,
      }),
    }).then(setPosted((prev) => !prev));
    //reset setPost and setRating
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
          //once you submit you call this function
          handleSubmit();
        }}
      >
        <Post
          type="text"
          placeholder=" Highlight your experience"
          value={post}
          //saves all value in the textarea in the post
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
  color: #161b21;
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
export default GasStationCreatePost;
