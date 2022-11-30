import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Alarm = () => {
  const [subscribe, setSubscribe] = useState(false);
  const [alarmList, setAlarmList] = useState([]);
  let evSource;

  // useEffect(() => {
  //   if (!subscribe) {
  //     evSource = new EventSource();
  //     evSource.onmessage = (ev) => {

  //     }
  //   }

  // }, [])
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
  border-bottom-color: #ecf0f1;
`;
const UpperProfileDiv = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ecf0f1;
  border-radius: 10px;
`;