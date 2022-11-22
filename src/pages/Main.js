import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getMyFriends, getMyInfo } from "../api/memberManage";
import { getSchedules } from "../api/schedulesManage";
import Loading from "../components/parkmade/common/loading/Loading";
import ChoicePlan from "../components/parkmade/common/modal/ChoicePlan";
import Portal from "../components/parkmade/common/modal/Portal";
import EditMyProfile from "../components/parkmade/common/navigationBar/EditMyProfile";
import NavBar from "../components/parkmade/common/navigationBar/NavBar";
import ToDos from "../components/parkmade/main/ToDos";
import Calendar from "../components/yoonmade/Calendar";

// 이곳에서 main페이지에 나타나는 모든 데이터 관련(모달창 제외) 서버통신이 이루어집니다.
const Main = () => {
  const [isChoiceGroup, setIsChoiceGroup] = useState(false);
  const [isEditProfile, setIsEditProfile] = useState(false);
  const { isLoading:infoLoading, data:infoData } = useQuery(["myInfo"], getMyInfo);
  const { isLoading:schedulesLoading, data:schedulesData } = useQuery(["schedules"], getSchedules);
  const { isLoading:myFriendsLoading, data:myFriendsList } = useQuery(["getMyFriends"], getMyFriends);
  return (
    <>
      {(infoLoading || schedulesLoading || myFriendsLoading) ? 
        <Loading /> :
        <>
          <NavBar infoData={infoData} setIsEditProfile={setIsEditProfile}/>
          <Portal>
            {isChoiceGroup && <ChoicePlan isChoiceGroup={isChoiceGroup} setIsChoiceGroup={setIsChoiceGroup} myFriendsList={myFriendsList.data}/>}
            {isEditProfile && <EditMyProfile info={infoData.data} setIsEditProfile={setIsEditProfile}/>}
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