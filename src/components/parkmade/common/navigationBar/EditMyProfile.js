import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import styled from "styled-components";
import { postNickDupChecker, putInfoChange } from "../../../../api/memberManage";
import camera from "../../../../img/camera.png"
import { useDispatch, useSelector } from "react-redux";
import { toggleEditProfile } from "../../../../store/modules/parkmade/toggleModal";

const EditMyProfile = ({info}) => {
  const modalRef = useRef();
  const dispatch = useDispatch();
  const isEditProfile = useSelector(state => state.toggleModal.editProfile);
  const { register, handleSubmit, setValue, getValues } = useForm();
  const [isChangeImg, setIsChangeImg ] = useState("");
  const [doneDupCheck, setDoneDupCheck] = useState(false);
  const [myNick, setMyNick] = useState(info.userName);
  const { mutate:changeInfo } = useMutation(putInfoChange, {
    onSuccess: (res) => {
      alert("성공!");
      setValue("nickname", "")
    },
    onError: (err) => {
      alert("지쟈스");
      // alert("내용을 입력해주세요");
    }
  });
  const { mutate:checkNickname} = useMutation(postNickDupChecker, {
    onSuccess: (res) => {
      alert("사용가능합니다.");
      setDoneDupCheck(true);
      setMyNick(getValues("nickname"));
    },
    onError: (err) => {
      alert("사용불가능합니다.");
      setValue("nickname", "");
    }
  });
  const dupCheck = () => {
    (getValues("nickname")) ? checkNickname({"userName":getValues("nickname")}) : alert("닉네임을 입력해주세요.")
  };
  const cancel = () => {
    dispatch(toggleEditProfile(false));
  };
  const getImgFile = (ev) => {
    const newImg = ev.target.files[0];
    if (newImg) {
      const url = URL.createObjectURL(newImg);
      setIsChangeImg(url);
    };
  };
  const submit = (data) => {
    const formData = new FormData();
    if (data.nickname) {
      if (!doneDupCheck) {
        alert("닉네임 중복확인 해 주 세 요.");
        return;
      };
      formData.append("userName", data.nickname);
      if (data.img[0]) {
        formData.append("file", data.img[0]);
      };
    } ;
    if (!data.nickname) {
      formData.append("userName", "");
      if (data.img[0]) {
        formData.append("file", data.img[0]);
      };
    };
    if (window.confirm("수정하시겠습니까?")) {
      changeInfo(formData);
    };
  };
  useEffect(() => {
    document.addEventListener('mousedown', clickModalOutside);
    return () => {document.removeEventListener('mousedown', clickModalOutside)};
  });
  const clickModalOutside = (ev) => {
    (isEditProfile && !modalRef.current.contains(ev.target)) && dispatch(toggleEditProfile(false));
  };
  return (
    <Wrap>
      <UpperProfileForm ref={modalRef} onSubmit={handleSubmit(submit)}>
        <UpperImgDiv>
          <ImgDiv>
            <Img src={isChangeImg ? isChangeImg : info.imgUrl} />
            <ClickMe whileHover={{ scale: 1.05 }}>
              <CameraImg src={camera}/>
              <InputImg {...register("img")} onChange={getImgFile} type="file" />
            </ClickMe>
          </ImgDiv>
          <NowName>
            {myNick}
          </NowName>
        </UpperImgDiv>
        <ProfileDiv>
          <MyInfoDiv>
            <EditName>
              <NickNameInput {...register("nickname", { pattern: { value: /^[-a-zA-Z0-9가-힣]{2,8}$/ } })} placeholder="2~8글자 한글 가능!" />
              <EditBtn onClick={dupCheck} whileHover={{ scale: 1.1 }}>
                중복확인
              </EditBtn>
            </EditName>
            <Span>
              
            </Span>
          </MyInfoDiv>
          <CompleteDeleteDiv>
            <CompleteBtn whileHover={{ scale: 1.05 }}>
              수정
            </CompleteBtn>
            <CancelDiv onClick={cancel} whileHover={{ scale: 1.05 }}>
              취소
            </CancelDiv>
          </CompleteDeleteDiv>
        </ProfileDiv>
      </UpperProfileForm>
    </Wrap>
  );
}
export default EditMyProfile;

const Wrap = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  z-index: 10;
`;
const UpperProfileForm = styled.form`
  height: 50%;
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ecf0f1;
  border-radius: 10px;
`;
const UpperImgDiv = styled.div`
  height: 60%;
  width: 95%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const ImgDiv = styled.div`
  width: 140px;
  height: 140px;
  margin-top: 15%;
  position: relative;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 70px;
  background-color: gray;
`;
const ClickMe = styled(motion.div)`
  height: 18%;
  width: 18%;
  top: 80%;
  right: 5%;
  border: 1px solid #AAAFB5;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: #E9EEF2;
  font-size: 70%;
`;
const CameraImg = styled(motion.img)`
  height: 100%;
  width: 100%;
`;
const InputImg = styled.input`
  width: 100%;
  max-height: 100%;
  border-radius: 50%;
  position: absolute;
  background-color: red;
  opacity: 0;
`;
const NowName = styled.div`
  height: 13%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 110%;
  font-weight: 600;
`;
const ProfileDiv = styled.div`
  height: 40%;
  width: 95%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const MyInfoDiv = styled.div`
  height: 40%;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const EditName = styled.div`
  height: 70%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Span = styled.span`
  font-size: 70%;
  margin-left: 3%;
`;
const NickNameInput = styled.input`
  height: 60%;
  width: 70%;
  border: 1px solid #AAAFB5;
  border-radius: 5px;
  display: flex;
  align-items: center;
  font-size: 60%;
  font-weight: 800; 
  text-indent: 10px;
`;
const EditBtn = styled(motion.div)`
  height: 70%;
  width: 25%;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #AAAFB5;
  color: white;
  font-size: 90%;
  font-weight: 600;
  cursor: pointer;
`;
const CompleteDeleteDiv = styled.div`
  height: 20%;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3%;
  gap: 5%;
`;
const CompleteBtn = styled(motion.button)`
  height: 80%;
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3%;
  border-radius: 10px;
  background-color: black;
  color: white;
  font-weight: 800;
  cursor: pointer;
`;
const CancelDiv = styled(motion.div)`
  height: 80%;
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3%;
  border-radius: 10px;
  background-color: black;
  color: white;
  font-size: 80%;
  font-weight: 800;
  cursor: pointer;
`;