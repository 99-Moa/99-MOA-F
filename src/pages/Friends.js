import { useQuery } from "react-query";
import { getMyInfo } from "../api/memberManage";
import NavBar from "../components/parkmade/common/navigationBar/NavBar";


const Friends = () => {
  const { isLoading:infoLoading, data:infoData } = useQuery(["myInfo"], getMyInfo);
  return (
    <>
      <NavBar infoData={infoData}/>
    </>
  );
}

export default Friends;