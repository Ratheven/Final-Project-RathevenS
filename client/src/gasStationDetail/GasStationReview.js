import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import ReviewStar from "./ReviewStar";
import DeletPost from "./DeletePost";

const GasStationReview = ({ selectedStation, id, setPosted }) => {
  //auth0
  const { user, isAuthenticated } = useAuth0();
  return (
    <>
      <Reviews>Recent Reviews</Reviews>
      {/* map throught the data that we are recieving through props and display the information*/}
      {selectedStation.review.map((post, index) => {
        return (
          <PostContainer key={index}>
            <ReviewHeader>
              <Wrapper>
                <div>
                  <AvatarImg src={post.displayPic} />
                </div>
                <div>
                  <DisplayName>{post.displayName}</DisplayName>
                  <Date>{post.posted}</Date>
                </div>
              </Wrapper>
              {/* if the user email and the post email match. The delete button will appear */}
              {isAuthenticated && post.email === user.email && (
                <DeletPost _id={id} id={post.id} setPosted={setPosted} />
              )}
            </ReviewHeader>
            <ReviewStar stars={post.stars} />
            <Post>{post.post}</Post>
          </PostContainer>
        );
      })}
    </>
  );
};
const Reviews = styled.p`
  margin: 20px 0 10px 0;
  font-weight: bold;
  font-size: 13px;
`;

const PostContainer = styled.div`
  background-color: #dcdfe1;
  padding: 10px;
  border: 1px solid black;
  margin: 10px 0 10px 0;
  border-radius: 17px;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const Wrapper = styled.div`
  display: flex;
`;
const AvatarImg = styled.img`
  border-radius: 50%;
  width: 60px;
`;
const DisplayName = styled.span`
  font-weight: bold;
  padding-right: 5px;
  padding-left: 10px;
  position: relative;
  top: 20px;
`;
const Date = styled.span`
  padding-left: 10px;
  position: relative;
  top: 20px;
  font-size: 12px;
`;
const Post = styled.p`
  margin: 10px 0 10px 0;
`;
export default GasStationReview;
