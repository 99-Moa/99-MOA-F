import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getMyInfo } from "../api/memberManage";
import Loading from "../components/parkmade/common/loading/Loading";
import Portal from "../components/parkmade/common/modal/Portal";
import EditMyProfile from "../components/parkmade/common/navigationBar/EditMyProfile";
import NavBar from "../components/parkmade/common/navigationBar/NavBar";


const Friends = () => {
  const [isEditProfile, setIsEditProfile] = useState(false);
  const { isLoading:infoLoading, data:infoData } = useQuery(["myInfo"], getMyInfo);
  // 요기서 리액트쿼리 쓰셔서 하위 컴포넌트로 뿌리시면 됩니다.
  return (
    <>
      {(infoLoading) ? 
        <Loading /> :
        <>
          <NavBar infoData={infoData} setIsEditProfile={setIsEditProfile}/>
          <Portal>
            {isEditProfile && <EditMyProfile info={infoData.data} setIsEditProfile={setIsEditProfile}/>}
          </Portal>
          <Wrap>
            {/* 요기다가 컴포넌트 넣으면 됩니다. */}
          </Wrap>
        </>
      } 
    </>
  );
}

export default Friends;

const Wrap = styled(motion.div)`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3%;
`;