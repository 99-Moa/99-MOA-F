import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Alarm from "./Alarm";

const Alarms = () => {
  const [subscribe, setSubscribe] = useState(false);
  const [alarmList, setAlarmList] = useState([]);
  let evSource;
  
  useEffect(() => {
    if (!subscribe) {
      evSource = new EventSource(`http://18.206.140.108/sub?token=${localStorage.getItem("access_token")}`);
      evSource.onopen = (ev) => {
        console.log("연결잘됨")
      }
      evSource.onmessage = (ev) => {
        setAlarmList(prev => [...prev, ev.data])
      }
    }

  }, [])
  return (
    <UpperDiv>
      <UpperProfileDiv>
        {alarmList.length>0 && alarmList.map((prop) => <Alarm key={prop.id} prop={prop}/>)}
      </UpperProfileDiv>
    </UpperDiv>
  );
}

export default Alarms;

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
  border: 5px solid transparent;
  border-bottom-color: #AAAFB5;
`;
const UpperProfileDiv = styled.div`
  height: 100%;
  width: 100%;
  margin-top: 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border: 3px solid #AAAFB5;
  border-radius: 10px;
  overflow: auto;
`;