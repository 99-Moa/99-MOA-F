import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import styled from "styled-components";
import { postNickDupChecker, putInfoChange } from "../../../../api/memberManage";
import pePe from "../../../../img/pePe.png"

const EditMyProfile = ({setIsEdit, info}) => {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const [isChangeImg, setIsChangeImg ] = useState("");
  const [doneDupCheck, setDoneDupCheck] = useState(false);
  const { mutate:changeInfo } = useMutation(putInfoChange, {
    onSuccess: (res) => {
      alert("성공!")
      setIsEdit(prev=>!prev);
    },
    onError: (err) => {
      alert("지쟈스");
    }
  });
  const { mutate:checkNickname} = useMutation(postNickDupChecker, {
    onSuccess: (res) => {
      alert("사용가능합니다.");
      setDoneDupCheck(true);
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
    setIsEdit(prev=>!prev);
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
      if (!data.img[0]) {
        formData.append("file", "");
      };
    } ;
    if (!data.nickname) {
      formData.append("userName", "");
      if (data.img[0]) {
        formData.append("file", data.img[0]);
      };
      if (!data.img[0]) {
        formData.append("file", "");
      };
    };
    if (window.confirm("수정하시겠습니까?")) {
      changeInfo(formData);
    }
  }
  return (
    <UpperDiv>
      <Triangle />
      <UpperProfileForm onSubmit={handleSubmit(submit)}>
        <ImgDiv>
          <Img src={isChangeImg ? isChangeImg : pePe} />
          <ClickMe whileHover={{scale:1.2}}>
            click me!
            <InputImg {...register("img")} onChange={getImgFile} type="file" />
          </ClickMe>
        </ImgDiv>
        <ProfileDiv>
          <MyInfoDiv>
            <EditName>
              <NickNameInput {...register("nickname", {pattern : {  value: /^[-a-zA-Z0-9가-힣]{2,8}$/ }})} placeholder={info.userName} />
              <EditBtn onClick={dupCheck} whileHover={{scale:1.1}}>
                중복<br />
                확인
              </EditBtn>
            </EditName>
            <Span>
              2~8글자 한글 가능!
            </Span>
          </MyInfoDiv>
          <CompleteDeleteDiv>
            <CompleteBtn whileHover={{scale:1.05}}>
              수정하기
            </CompleteBtn>
            <CancelDiv onClick={cancel} whileHover={{scale:1.05}}>
              취소
            </CancelDiv>
          </CompleteDeleteDiv>
        </ProfileDiv>
      </UpperProfileForm>
    </UpperDiv>
  );
}
export default EditMyProfile;

const UpperDiv = styled(motion.div)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Triangle = styled.div`
  height: 0px;
  width: 0px;
  border: 10px solid transparent;
  border-bottom-color: #81ecec;
`;
const UpperProfileForm = styled.form`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #81ecec;
  border-radius: 10px;
`;
const ImgDiv = styled.div`
  height: 100%;
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const InputImg = styled.input`
  width: 50%;
  max-height: 90%;
  border-radius: 50%;
  position: absolute;
  background-color: red;
  opacity: 0;
`;
const Img = styled.img`
  width: 80%;
  max-height: 80%;
  border-radius: 75px;
  background-color: gray;
`;
const ClickMe = styled(motion.div)`
  height: 15%;
  width: 80%;
  font-size: 100%;
  display: flex;
  padding-top: 1%;
  justify-content: center;
  align-items: center;
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
  display: flex;
  align-items: center;
  font-size: 100%;
  font-weight: 800; 
  border: transparent;
  border-radius: 10px;
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
const CompleteDeleteDiv = styled.div`
  height: 20%;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 7%;
  gap: 5%;
`;
const CompleteBtn = styled(motion.button)`
  height: 100%;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3%;
  border-radius: 10px;
  background-color: black;
  color: white;
  font-size: 110%;
  font-weight: 800;
  cursor: pointer;
`;
const CancelDiv = styled(motion.div)`
  height: 100%;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3%;
  border-radius: 10px;
  background-color: black;
  color: white;
  font-size: 110%;
  font-weight: 800;
  cursor: pointer;
`;