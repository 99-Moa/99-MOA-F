import { useState } from "react";
import { useQuery } from "react-query";
import { getMyInfo } from "../api/memberManage";
import Loading from "../components/parkmade/common/loading/Loading";
import NavBar from "../components/parkmade/common/navigationBar/NavBar";


const Friends = () => {
  const [isEditProfile, setIsEditProfile] = useState(false);
  const { isLoading:infoLoading, data:infoData } = useQuery(["myInfo"], getMyInfo);
  return (
    <>
      {(infoLoading) ? 
        <Loading /> :
        <>
          <NavBar infoData={infoData} setIsEditProfile={setIsEditProfile}/>
        </>
      } 
    </>
  );
}

export default Friends;