import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getMyInfo } from "../api/memberManage";
import Loading from "../components/parkmade/common/loading/Loading";
import Portal from "../components/parkmade/common/modal/Portal";
import EditMyProfile from "../components/parkmade/common/navigationBar/EditMyProfile";
import NavBar from "../components/parkmade/common/navigationBar/NavBar";
import ChatPage from "../components/yoonmade/ChatPage"
import { io } from "socket.io-client";


const ChatRoom = () => {
  // const [isEditProfile, setIsEditProfile] = useState(false);
  // const { isLoading:infoLoading, data:infoData } = useQuery(["myInfo"], getMyInfo);
  
  return (
    <>
      {/* {(infoLoading) ?
        <Loading /> : */}
        <>
          {/* <NavBar infoData={infoData} setIsEditProfile={setIsEditProfile}/> */}
          {/* <Portal>
            {isEditProfile && <EditMyProfile info={infoData.data} setIsEditProfile={setIsEditProfile}/>}
          </Portal> */}
          <ChatPage />
        </>
      {/* } */}
    </>
  );
}

export default ChatRoom;