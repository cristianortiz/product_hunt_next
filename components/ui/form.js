import styled from "@emotion/styled";

//styled component to reuse en all the forms in te app
export const Form = styled.form`
  max-width: 600px;
  width: 95%;
  margin: 4rem auto 0 auto;
`;

export const Field = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;

  label {
    flex: 0 0 150px;
    font-size: 1.2;
  }
  input {
    flex: 1;
    padding: 0.8rem;
  }
`;
export const InputSubmit = styled.input`
  background-color: var(--orange);
  width: 100%;
  padding: 1rem;
  text-align: center;
  color: #fff;
  font-size: 1.2rem;
  text-transform: uppercase;
  border: none;
  font-family: "Noto Sans JP", sans-serif;
  font-weight: 700;

  &:hover {
    cursor: pointer;
  }
`;
