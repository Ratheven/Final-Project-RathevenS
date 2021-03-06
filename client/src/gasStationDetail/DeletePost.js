import { AiFillDelete } from "react-icons/ai";
import styled from "styled-components";

const DeletPost = ({ id, setPosted, _id }) => {
  
  const handleDelete = () => {
    //Delete post by passing the id as a param
    fetch(`/post/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _id: _id,
      }),
      //changes the previous post to the opposite boolean
    }).then(setPosted((prev) => !prev));
  };

  return (
  
    <Garbage
      onClick={() => {
        handleDelete();
      }}
    >
      {/* React Icon */}
      <AiFillDelete style={{ width: "30px", height: "25px" }} />
    </Garbage>
  );
};

const Garbage = styled.p`
  margin: 3px 5px 0 0;
  cursor: pointer;
`;

export default DeletPost;
