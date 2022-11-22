import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import MyProfile from "./MyProfile";
import Alarm from "./Alarm";
import EditMyProfile from "./EditMyProfile";
import alarmImg from "../../../../img/Icon_Alarm.png";
import groupImg from "../../../../img/Icon_Group.png"
import defaultImg from "../../../../img/Icon_Profile.png"
import logoImg from "../../../../img/Logo_Main.png"
import { useMutation } from "react-query";
import { postPlusFriend } from "../../../../api/memberManage";

const NavBar = ({infoData, setIsEditProfile}) => {
  const navigate = useNavigate();
  const [myInfo, setMyInfo] = useState(false);
  const [alarm, setAlarm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  // 임시로 친구추가 해보려고 만든거임 삭제해야도맨ㅇ
  const { mutate } = useMutation(postPlusFriend, {
    onSuccess: (res) => {
      console.log("성공", res)
    }
  })
  const toMain = () => {
    navigate("/main")
  };
  const toMyFriends = () => {
    // navigate("/myFriends")
    // 친구추가 테스트용 나중에 삭제하자
    mutate({"userName": "박박박박박테스트"})
  };
  const showAlarm = () => {
    // 알람 확인하기
    setMyInfo(false);
    setAlarm(prev=>!prev);
  };
  const modalProfile = () => {
    setAlarm(false);
    setMyInfo(prev=>!prev);
  }
  return (
    <Upper>
      <Wrap>
        <LogoUpperDiv>
          <LogoImg src={logoImg} onClick={toMain}/>
        </LogoUpperDiv>
        <NavUpperDiv>
          <EleImgDiv>
            <NavImg src={groupImg} onClick={toMyFriends}/>
          </EleImgDiv>
          <EleImgDiv>
            <NavImg src={alarmImg} onClick={showAlarm}/>
            <AlarmWrap
              transition={{ type: "linear" }}
              initial={{scale: 0}}
              animate={{ scale: alarm ? 1 : 0, opacity: alarm ? 1 : 0 }}
            >
              <Alarm />
            </AlarmWrap>
          </EleImgDiv>
          <EleImgDiv>
            <NavImg src={infoData.data.imgUrl} onClick={modalProfile}/>
              <ProfileWrap
                transition={{ type: "linear" }}
                initial={{scale: 0}}
                animate={{ scale: myInfo ? 1 : 0, opacity: myInfo ? 1 : 0}}
              >
                <MyProfile setMyInfo={setMyInfo}  info={infoData.data} setIsEditProfile={setIsEditProfile}/>
              </ProfileWrap>
          </EleImgDiv>
        </NavUpperDiv>
      </Wrap>
    </Upper>
  )
}

export default NavBar;

const Upper = styled.div`
  width: 100%;
  height: 70px;
  border-bottom: 1px solid rgb(219, 219, 219);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;
const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  height: 100%;
`;
const LogoUpperDiv = styled.div`
  width: 10%;
  height: 100%;
  display: flex;
  align-items: center;
`;
const LogoImg = styled(motion.img)`
  width: 100%;
  max-height: 100%;
  cursor: pointer;
`;
const NavUpperDiv = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const EleImgDiv = styled.div`
  height: 60px;
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1%;
  position: relative;
`;
const NavImg = styled(motion.img)`
  height: 80%;
  width: 80%;
  border-radius: 50%;
  cursor: pointer;
`;
const ProfileWrap = styled(motion.div)`
  height: 350%;
  width: 650%;
  top: 85%;
  position: absolute;
  transform-origin: top center;
`;
const AlarmWrap = styled(motion.div)`
  height: 350%;
  width: 650%;
  top: 85%;
  position: absolute;
  transform-origin: top center;
`;