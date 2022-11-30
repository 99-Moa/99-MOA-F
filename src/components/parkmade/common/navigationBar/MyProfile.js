import { motion } from "framer-motion";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { postLogOut } from "../../../../api/memberManage";
import pePe from "../../../../img/pePe.png"
import { toggleEditProfile } from "../../../../store/modules/parkmade/toggleModal";

// 상위에서 이미지, 이름 받아와야함
const MyProfile = ({info, setMyInfo}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutate } = useMutation(postLogOut, {
    onSuccess: (res) => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      navigate("/")
    }
  })
  const logOut = () => {
    mutate();
  }
  const editProfile = () => {
    dispatch(toggleEditProfile(true));
    setMyInfo(prev=>!prev)
  }
  return (
    <UpperDiv>
      <Triangle />
      <UpperProfileDiv>
        <ImgDiv>
          <Img src={info.imgUrl}/>
        </ImgDiv>
        <ProfileDiv>
          <MyInfoDiv>
            <NickNameSpan>
              {info.userName}
            </NickNameSpan>
            <EditBtn onClick={editProfile}>
              편집
            </EditBtn>
          </MyInfoDiv>
          <LogOutBtn onClick={logOut}>
            로그아웃
          </LogOutBtn>
        </ProfileDiv>
      </UpperProfileDiv>
    </UpperDiv>
  );
}

export default MyProfile;

const UpperDiv = styled(motion.div)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
`;
const Triangle = styled.div`
  height: 0px;
  width: 0px;
  border: 10px solid transparent;
  border-bottom-color: #ecf0f1;
`;
const UpperProfileDiv = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ecf0f1;
  border-radius: 10px;
`;
const ImgDiv = styled.div`
  height: 100%;
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Img = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 65px;
  background-color: gray;
`;
const ProfileDiv = styled.div`
  height: 100%;
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const MyInfoDiv = styled.div`
  height: 40%;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const NickNameSpan = styled.span`
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 130%;
  font-weight: 800;
`;
const EditBtn = styled(motion.div)`
  height: 100%;
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 90%;
  font-weight: 600;
  cursor: pointer;
`;
const LogOutBtn = styled(motion.div)`
  height: 20%;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 7%;
  border-radius: 10px;
  background-color: black;
  color: white;
  font-size: 110%;
  font-weight: 800;
  cursor: pointer;
`;