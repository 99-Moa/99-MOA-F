import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getMyInfo } from "../api/memberManage";
import { getSchedules } from "../api/schedulesManage";
import Loading from "../components/parkmade/common/loading/Loading";
import ChoiceGroup from "../components/parkmade/common/modal/ChoiceGroup";
import Portal from "../components/parkmade/common/modal/Portal";
import NavBar from "../components/parkmade/common/navigationBar/NavBar";
import ToDos from "../components/parkmade/main/ToDos";
import Calendar from "../components/yoonmade/Calendar";

// 이곳에서 main페이지에 나타나는 모든 데이터 관련(모달창 제외) 서버통신이 이루어집니다.
const Main = () => {
  const [isChoiceGroup, setIsChoiceGroup] = useState(false);
  const { isLoading:infoLoading, data:infoData } = useQuery(["myInfo"], getMyInfo);
  const { isLoading:schedulesLoading, data:schedulesData } = useQuery(["schedules"], getSchedules);
  return (
    <>
      {(infoLoading || schedulesLoading) ? 
        <Loading /> :
        <>
          <NavBar infoData={infoData} />
          <Portal>
            {isChoiceGroup && <ChoiceGroup isChoiceGroup={isChoiceGroup} setIsChoiceGroup={setIsChoiceGroup} />}
          </Portal>
          <Wrap>
            <Calendar setIsChoiceGroup={setIsChoiceGroup} schedulesData={schedulesData}/>
            <ToDos schedulesData={schedulesData}/>
          </Wrap>
        </>
      } 
    </>
  );
}

export default Main;

const Wrap = styled(motion.div)`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3%;
`;
const VideoTest = styled.video`
  height: 50%;
  width: 50%;
  margin: auto;
  border: 1px solid;
`;