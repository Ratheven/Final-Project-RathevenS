import { useState } from "react";
import { FaStar } from "react-icons/fa";
import styled from "styled-components";

const StarRating = ({ setRating, rating }) => {
  const [hover, setHover] = useState(null);
  //   const ratingValue=0
  return (
    <StarWrapper>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <label>
            <StarInput
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />

            <FaStar
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              size={40}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </StarWrapper>
  );
};
const StarInput = styled.input`
  display: none;
`;
const StarWrapper = styled.div`
  

`;
export default StarRating;
