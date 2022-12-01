import { motion } from "framer-motion";
import { useRef, useState } from "react";
import styled from "styled-components";
import CountDay from "./CountDay";
import ToDo from "./ToDo";

const ToDos = ({schedulesData}) => {
  const traceScroll = useRef();
  const [extend, setExtend] = useState(false);
  const [upToDatePlan, setUpToDatePlan] = useState(false);
  const sortPlan = (schedulesData.sort((a,b) => (new Date(`${a.startDate} ${a.startTime}`) - new Date(`${b.startDate} ${b.startTime}`)))).filter(prop=> new Date(`${prop.startDate} ${prop.startTime}`) > new Date());
  return (
    <Wrap>
      <UpperDiv variants={WrapVariant} animate="start">
        <DDayDiv>
          <CountDay firstDate={sortPlan[0]?.startDate} firstTime={sortPlan[0]?.startTime} setUpToDatePlan={setUpToDatePlan} />
        </DDayDiv>
        <ToDoDiv ref={traceScroll}>
          {sortPlan.map((prop, index) => <ToDo key={prop.id} prop={prop} setExtend={setExtend} traceScroll={traceScroll} index={index} />)}
          {extend && <Extend />}
        </ToDoDiv>
      </UpperDiv>
    </Wrap>
  )
}

export default ToDos;

const Wrap = styled.div`
  height: 100%;
  width: 25%;
  border-left: 1px solid #AAAFB5;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const UpperDiv = styled(motion.div)`
  height: 80%;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20%;
`;
const DDayDiv = styled(motion.div)`
  height: 15%;
  width: 100%;
  margin: 1% 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ToDoDiv = styled(motion.div)`
  height: 89%;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2% 0px;
  margin: 2% 0px;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const Extend = styled.div`
  height: 100%;
  width: 100%;
`;

const WrapVariant = {
  start : {
    scale: 1
  }
}