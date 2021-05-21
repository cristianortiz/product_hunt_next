import styled from "@emotion/styled";
const Button = styled.a`
  font-weight: 700;
  text-transform: uppercase;
  border: 1px solid #d1d1d1;
  padding: 0.5rem 1.5rem;
  margin-right: 1rem;
  //passing props to button
  background-color: ${(props) => (props.bgColor ? "#DA552F" : "white")};
  color: ${(props) => (props.bgColor ? "white" : "#000")};

  //if is positioned as last button
  &::last-of-type {
    margin-right: 0;
  }
  &:hover {
    cursor: pointer;
    background-color: coral;
  }
`;
export default Button;
