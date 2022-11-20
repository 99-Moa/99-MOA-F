import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import NewMeet from "./MakeGroup";
import MyPlan from "./MyPlan";

const ChoiceGroup =({isChoiceGroup, setIsChoiceGroup}) => {
  const modalRef = useRef();
  const [isFirStep, setIsFirStep] = useState(true);
  const [isAlone, setIsAlone] = useState(true);
  const nextStep = (ev) => {
    setIsFirStep(false);
    (ev.target.innerText === "그룹") ? setIsAlone(prev=>!prev) : setIsAlone(true)
  };

  useEffect(() => {
    document.addEventListener('mousedown', clickModalOutside);
    return () => {document.removeEventListener('mousedown', clickModalOutside)};
  });
  const clickModalOutside = (ev) => {
    (isChoiceGroup && !modalRef.current.contains(ev.target)) && setIsChoiceGroup(false);
  };
  return (
    <Wrap>
      {isFirStep ?
        (<UpperDiv ref={modalRef} layoutId="transition">
          <ChoiceBtn onClick={nextStep}>개인</ChoiceBtn>
          <ChoiceBtn onClick={nextStep}>그룹</ChoiceBtn>
        </UpperDiv>) 
        :
        isAlone ?
          (<Alone ref={modalRef} layoutId="transition">
            <MyPlan />
          </Alone>)
          :
          (<Group ref={modalRef} layoutId="transition">
            <NewMeet />
          </Group>)
      }
    </Wrap>
  );
}

export default ChoiceGroup;

const Wrap = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  z-index: 10;
`;
const UpperDiv = styled(motion.div)`
  width: 20%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 15px;
  gap: 2%;
`;
const ChoiceBtn = styled(motion.button)`
  width: 40%;
  height: 10%;
  border-radius: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const Alone = styled(motion.div)`
  width: 35%;
  height: 90%;
  border: 1px solid;
  border-radius: 15px;
  background-color: white;
`;
const Group = styled(motion.div)`
  width: 35%;
  height: 85%;
  border: 1px solid;
  border-radius: 15px;
  background-color: white;
  display: flex;
  justify-content: center;
`;