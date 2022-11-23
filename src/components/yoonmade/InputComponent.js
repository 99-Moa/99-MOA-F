import styled from "styled-components";
import { defaultColor } from "./styles";

const InputComponent = ({ placeholder, ...rest }) => {
  console.log(rest);
  return (
    <InputWrapper>
      <Input placeholder={placeholder} {...rest} />
      <div>
        <svg aria-label="검색" role="img" viewBox="0 0 24 24">
          <path
            d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          ></path>
          <line
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            x1="16.511"
            x2="22"
            y1="16.511"
            y2="22"
          ></line>
        </svg>
      </div>
    </InputWrapper>
  );
};

export default InputComponent;

const InputWrapper = styled.div`
  height: 100%;
  width: 18em;
  border-radius: 0.2em;
  display: flex;
  background-color: ${defaultColor.lightGrey};
  overflow: hidden;

  div {
    margin-right: 0.8em;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      height: 1em;
      width: 1em;
      right: 0;
    }
  }
`;

const Input = styled.input`
  height: 100%;
  width: 100%;
  padding: 0 1em;
  border: 1px solid ${defaultColor.lightGrey};
  background-color: ${defaultColor.lightGrey};
  font-size: 0.8em;
  color: ${defaultColor.black};
  outline-style: none;
`;
