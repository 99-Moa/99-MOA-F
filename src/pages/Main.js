import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getMyFriends, getMyInfo } from "../api/memberManage";
import { getSchedules } from "../api/schedulesManage";
import Loading from "../components/parkmade/common/loading/Loading";
import ChoicePlan from "../components/parkmade/common/modal/ChoicePlan";
import MakePlan from "../components/parkmade/common/modal/MakePlan";
import Portal from "../components/parkmade/common/modal/Portal";
import RevisePlan from "../components/parkmade/common/modal/RevisePlan";
import EditMyProfile from "../components/parkmade/common/navigationBar/EditMyProfile";
import NavBar from "../components/parkmade/common/navigationBar/NavBar";
import ToDos from "../components/parkmade/main/ToDos";
import Calendar from "../components/yoonmade/Calendar";

// 이곳에서 main페이지에 나타나는 모든 데이터 관련(모달창 제외) 서버통신이 이루어집니다.
const Main = () => {
  const isChoiceGroup = useSelector(state => state.toggleModal.choiceGroup);
  const isEditProfile = useSelector(state => state.toggleModal.editProfile);
  const isRevisePlan = useSelector(state => state.toggleModal.revisePersonalPlan[0]);
  
  const { isLoading:infoLoading, data:infoData } = useQuery(["myInfo"], getMyInfo);
  const { isLoading:schedulesLoading, data:schedulesData } = useQuery(["schedules"], getSchedules);
  const { isLoading:myFriendsLoading, data:myFriendsList } = useQuery(["getMyFriends"], getMyFriends);
  return (
    <>
      {(infoLoading || schedulesLoading || myFriendsLoading) ? 
        <Loading /> :
        <>
          <NavBar infoData={infoData}/>
          <Portal>
            {isChoiceGroup && <ChoicePlan myFriendsList={myFriendsList.data}/>}
            {isEditProfile && <EditMyProfile info={infoData.data}/>}
            {isRevisePlan && <RevisePlan/>}
          </Portal>
          <Wrap>
            <Calendar schedulesData={schedulesData.data}/>
            {schedulesData.data.length ? <ToDos schedulesData={schedulesData.data} infoData={infoData.data}/> : null}
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
  justify-content: space-evenly;
  position: relative;
  z-index: 1;
`;
