import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import CountDay from "./CountDay";
import ToDo from "./ToDo";


// 리액트 쿼리 사용 데이터 받아와야함 => 메인페이지에서 받아서 프랍으로 넘겨받자.
// 클릭시 traceScroll의 스크롤top 위치를 11*index의 위치로 이동하게 (scrollby 이용)
// 참고 url https://jforj.tistory.com/153, https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollBy, 
const ToDos = () => {
  const traceScroll = useRef();
  const [extend, setExtend] = useState(false);
  const test = [1,2,3,4,5,
    6,7,8,9,10,11,12,13,14,15
  ];
  return (
    <Wrap>
      <DDayDiv>
        <CountDay/>
      </DDayDiv>
      <ToDoDiv ref={traceScroll}>
        {test.map((prop, index) => <ToDo key={index} prop={prop} setExtend={setExtend} traceScroll={traceScroll} index={index}/>)}
        {extend && <Extend />}
      </ToDoDiv>
    </Wrap>
  )
}

export default ToDos;

const Wrap = styled(motion.div)`
  height: 80%;
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5%;
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