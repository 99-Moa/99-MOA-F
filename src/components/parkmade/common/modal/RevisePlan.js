import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { revisePersonalPlan } from "../../../../store/modules/parkmade/toggleModal";
import MakePlan from "./MakePlan";

const RevisePlan = () => {
  const dispatch = useDispatch();
  const modalRef = useRef();
  const isRevisePlan = useSelector(state => state.toggleModal.revisePersonalPlan[0]);
  useEffect(() => {
    document.addEventListener('mousedown', clickModalOutside);
    return () => {document.removeEventListener('mousedown', clickModalOutside)};
  });
  const clickModalOutside = (ev) => {
    (isRevisePlan && !modalRef.current.contains(ev.target)) && dispatch(revisePersonalPlan([false, {}, null]));
  };
  return (
    <Wrap>
      <Alone ref={modalRef}>
        <MakePlan />
      </Alone>
    </Wrap>
  )
}

export default RevisePlan;

const Wrap = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
`;
const Alone = styled(motion.div)`
  width: 35%;
  height: 90%;
  border: 1px solid;
  border-radius: 15px;
  background-color: white;
`;