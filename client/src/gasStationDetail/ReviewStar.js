import { FaStar } from "react-icons/fa";
import styled from "styled-components";

const ReviewStar = ({ stars }) => {
  return (
    <StarWrapper>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <label>
            <StarInput type="radio" name="rating" />

            <FaStar
              color={ratingValue <= stars ? "#ffc107" : "#e4e5e9"}
              size={20}
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
const StarWrapper = styled.div``;

export default ReviewStar;
