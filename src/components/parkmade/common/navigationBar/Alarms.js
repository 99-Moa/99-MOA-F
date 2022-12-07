import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Alarm from "./Alarm";

const Alarms = () => {
  const [subscribe, setSubscribe] = useState(false);
  const [alarmList, setAlarmList] = useState([]);
  let evSource;
  useEffect(() => {
    if (!subscribe) {
      evSource = new EventSource(`http://18.206.140.108/sub?token=${localStorage.getItem("access_token")}`);
      evSource.onmessage = (ev) => {
        setAlarmList(prev => [...prev, JSON.parse(ev.data)])
      }
      setSubscribe(true);
      return () => {
        evSource.close();
      };
    }
  }, [])
  return (
    <UpperDiv>
      <UpperProfileDiv>
        {alarmList.length>0 ? alarmList.map((prop,index) => <Alarm key={index} prop={prop}/>) : null}
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
const UpperProfileDiv = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 4px;
  margin-top: 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.15);
  overflow: auto;
`;