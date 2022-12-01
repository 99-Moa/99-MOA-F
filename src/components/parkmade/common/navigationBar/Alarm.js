import styled from "styled-components";

const Alarm = ({prop}) => {
  return (
    <UpperDiv>
      {prop.message}
    </UpperDiv>
  );
}

export default Alarm;

const UpperDiv = styled.div`
  width: 95%;
  height: 15%;
  margin-top: 1%;
  display: flex;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;
`;