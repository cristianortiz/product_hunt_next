import styled from "@emotion/styled";

//styled component to reuse en all the forms in te app
export const Form = styled.form`
  max-width: 600px;
  width: 95%;
  margin: 4rem auto 0 auto;
  fieldset {
    margin: 1rem 0;
    border: 1px solid #e1e1e1;
    font-size: 1rem;
    padding: 1rem;
  }
`;

export const Field = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;

  label {
    flex: 0 0 150px;
    font-size: 1.2;
  }
  input,
  textarea {
    flex: 1;
    padding: 0.8rem;
  }
  textarea {
    height: 150px;
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

//erros styled component'
export const Error = styled.p`
  background-color: red;
  padding: 0.5rem 1rem;
  font-family: "Noto Sans JP", sans-serif;
  font-weight: 700;
  font-size: 1rem;
  color: #fff;
  text-align: center;
  text-transform: uppercase;
  margin: 1rem 0 1rem 0;
`;
