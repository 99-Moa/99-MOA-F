import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

const Alarm = ({prop}) => {
  return (
    <UpperDiv> 
      {prop.message}
    </UpperDiv>
  );
}

export default React.memo(Alarm);

const UpperDiv = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;

  &:hover {
    background-color: #E9EEF2;
  }
`;
const ImgDiv = styled.div`
  height: 100%;
  max-width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Img = styled.img`

`;
const InfoDiv = styled.div`
  height: 100%;
  max-width: 80%;
  display: flex;
  align-items: center;
`;