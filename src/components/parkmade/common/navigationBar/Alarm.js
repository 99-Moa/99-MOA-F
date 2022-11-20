import { motion } from "framer-motion";
import styled from "styled-components";

const Alarm = () => {
  return (
    <UpperDiv>
      <Triangle />
      <UpperProfileDiv>
        알람이 없군요~
      </UpperProfileDiv>
    </UpperDiv>
  );
}

export default Alarm;

const UpperDiv = styled(motion.div)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Triangle = styled.div`
  height: 0px;
  width: 0px;
  border: 10px solid transparent;
  border-bottom-color: #81ecec;
`;
const UpperProfileDiv = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #81ecec;
  border-radius: 10px;
`;