import { useState } from "react";
import { FaStar } from "react-icons/fa";
import styled from "styled-components";

const StarRating = ({ setRating, rating }) => {

  const [hover, setHover] = useState(null);

  return (
    <>
      <SpanKey>
        Rate Your Experience<RequireSpan> (required)</RequireSpan>
      </SpanKey>
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
    </>
  );
};
const StarInput = styled.input`
  display: none;
`;
const StarWrapper = styled.div``;
const SpanKey = styled.span`
  font-weight: bold;
`;
const RequireSpan = styled.span`
  color: gray;
  font-size: 13px;
`;
export default StarRating;
