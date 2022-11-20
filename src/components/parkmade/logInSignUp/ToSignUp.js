import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { postIdDupChecker, postNickDupChecker, postSignUp } from "../../../api/memberManage";
import LogoLogin from "../../../img/Logo_Login.png";

const ToSignUp = () => {
  const navigate = useNavigate();
  const [idCheckDone, setIdCheckDone] = useState(false);
  const [nickCheckDone, setNickCheckDone] = useState(false);
  const { register, handleSubmit, setValue, getValues } = useForm();
  const { mutate:toSign } = useMutation(postSignUp, {
    onSuccess: () => {
      alert("회원가입이 완료되었습니다.");
      setValue("signId", "");
      setValue("signPassword1", "");
      setValue("signPassword2", "");
      setValue("userName", "")
      navigate("/");
    },
    onError: () => {
      alert("실패! 다시 시도해주세요.");
    },
  });
  const { mutate:dupCheckId} = useMutation(postIdDupChecker, {
    onSuccess: (res)=> {
      if (res.data === "사용가능한 ID 입니다.") {
        setIdCheckDone(true);
        alert(res.data);
      } else {
        setIdCheckDone(false);
        alert(res.data);
      }
    },
    onError: () => {
      setIdCheckDone(false);
      alert("조건을 확인해 주세요");
      setValue("signId", "");
    }
  });
  const { mutate:dupCheckNick} = useMutation(postNickDupChecker, {
    onSuccess: (res)=> {
      if (res.data === "사용가능한 닉네임 입니다.") {
        setNickCheckDone(true);
        alert(res.data);
      } else {
        setNickCheckDone(false);
        alert(res.data);
      }
    },
    onError: () => {
      setNickCheckDone(false);
      alert("조건을 확인해 주세요");
      setValue("signNickname", "");
    }
  });
  const submitSignUp = (data) => {
    if (idCheckDone && nickCheckDone) {
      toSign({"userId":data.signId, "userName":data.signNickname, "password":data.signPassword1, "passwordCheck":data.signPassword2});
    }
    if (!idCheckDone) {
      alert("아이디 중복확인 해주세요")
    }
    if (!nickCheckDone) {
      alert("닉네임 중복확인 해주세요")
    }
  };
  const checkId = () => {
    dupCheckId({"userId":getValues("signId")});
  };
  const checkNick = () => {
    dupCheckNick({"userName":getValues("signNickname")});
  };
  const toLogIn = () => {
    navigate("/")
  };
  return (
    <UpperDiv>
      <Wrap>
        <MoaLogo>
          <MoaImg onClick={toLogIn} src={LogoLogin} />
        </MoaLogo>
        <SecUpperDiv>
          <Form onSubmit={handleSubmit(submitSignUp)}>
            <SignUserTitle>
              회원가입
            </SignUserTitle>
            <InputField>
              <InputDiv>
                <Input {...register("signId", {required: true})} placeholder="아이디(4~16자 숫자가능)" />
                <OverlapCheck whileHover={{scale:1.03}} onClick={checkId}>
                  중복확인
                </OverlapCheck>
              </InputDiv>
            </InputField>
            <InputField>
              <InputDiv>
                <Input type="text" {...register("signNickname", {required: true})} placeholder="닉네임(2~8자 한글가능)" />
                <OverlapCheck whileHover={{scale:1.03}} onClick={checkNick}>
                  중복확인
                </OverlapCheck>
              </InputDiv>
            </InputField>
            <InputField>
              <InputDiv>
                <Input type="password" {...register("signPassword1", {required: true})} placeholder="비밀번호(8~16자, 대문자, 특수문자 필수)" />
              </InputDiv>
            </InputField>
            <InputField>
              <InputDiv>
                <Input type="password" {...register("signPassword2", {required: true, validate : { areSame : (value) => value === getValues("signPassword2") ? true : "틀렸씁니다." }})} placeholder="비밀번호 확인" />
              </InputDiv>
            </InputField>
            <UpperLogin>
              <Login whileHover={{scale:1.02}}>
                회원가입
              </Login>
            </UpperLogin>
            <BackToLogInDiv> 
              이미 가입한 적이 있나요? &nbsp;
              <Span whileHover={{scale:1.1, fontWeight:"800"}} onClick={toLogIn}>
                로그인
              </Span>
            </BackToLogInDiv>
          </Form>
        </SecUpperDiv>
      </Wrap>
    </UpperDiv>
  );
}

export default ToSignUp;

const UpperDiv = styled(motion.div)`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f4f7f9;
`;
const Wrap = styled(motion.div)`
  width: 380px;
  height: 470px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;
const SecUpperDiv = styled(motion.div)`
  width: 380px;
  height: 500px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;
const SignUserTitle = styled.div`
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: 600;
`;
const MoaLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const MoaImg = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const Form = styled(motion.form)`
`;
const InputField = styled(motion.div)`
  width: 360px;
  height: 50px;
  display : flex;
  justify-content : center;
  align-items : center;
`;
const InputDiv =styled(motion.div)`
  width: 320px;
  height: 45px;
  display: flex;
`;
const Input = styled(motion.input)`
  width: 320px;
  height: 35px;
  border: 1px solid gray;
  border-radius: 3px;
  text-indent: 10px;
  
  &:focus {
    border: 2px solid #008cff;
    outline: none;
  }
`;
const UpperLogin = styled(motion.div)`
  width: 360px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap:20px;
`;
const OverlapCheck = styled(motion.div)`
  width:150px;
  height:40px;
  border-radius: 3px;
  margin-left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color:white;
  background-color: #a5aab0;
  cursor: pointer;
`;
const Login = styled(motion.button)`
  width: 320px;
  height: 40px;
  border: 2px solid transparent;
  border-radius: 3px;
  background-color: #008cff;
  color:white;
  font-weight: 800;
  cursor: pointer;
`;
const BackToLogInDiv = styled(motion.div)`
  width: 360px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 400;
`;
const Span = styled(motion.div)`
  font-weight: 200;
  cursor: pointer;
`;