import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { motion } from "framer-motion";
import styled from "styled-components";
import kaKao from "../../../img/kakao.png"
import LogoLogin from "../../../img/Logo_Login.png"
import { postLogin } from "../../../api/memberManage";

const ToLogIn = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const { mutate:toLogIn } = useMutation(postLogin, {
    onSuccess: (res) => {
      if (res.data.error) {
        alert("비밀번호가 일치하지 않습니다.")
        return;
      } else {
        localStorage.setItem("access_token", res.headers.access_token);
        localStorage.setItem("refresh_token", res.headers.refresh_token);
        navigate("/main");
        setValue("LogInId", "");
        setValue("LogInPassword", "");
      }
    },
    onError: (err) => {
      alert("로그인 실패!")
    }
  });
  const submitLogin = (data) => {
    toLogIn({"userId":data.LogInId, "password":data.LogInPassword});
  };
  const toSignUp = () => {
    navigate("/signUp");
  };

  // 카카오 소셜로그인 로직
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`
  const onKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL
  }
  return (
    <UpperDiv>
      <Wrap>
        <MoaLogo>
          <MoaImg src={LogoLogin}/>
        </MoaLogo>
        <SecUpperDiv>
          <Form onSubmit={handleSubmit(submitLogin)}>
            <SignSec>
              <SignTitle>
                일정은 모아에서!
              </SignTitle>
              <SignSubTitle>
                모아에서 지인들과 함께 일정을 정해보세요
              </SignSubTitle>
            </SignSec>
            <InputField>
              <InputDiv>
                <Input {...register("LogInId", {required: true})} placeholder="아이디" />
              </InputDiv>
            </InputField>
            <InputField>
              <InputDiv>
                <Input type="password" {...register("LogInPassword", {required: true})} placeholder="비밀번호 (8~16자 영문자+숫자+특수기호)" />
              </InputDiv>
            </InputField>
            <UpperLogin>
              <Login whileHover={{scale:1.02}}>
                로그인
              </Login>
              <LogInLine />
            </UpperLogin>
            <StartKakaDiv>
              <Sign onClick={toSignUp} whileHover={{scale:1.02}}>
                회원가입
              </Sign>
              <KaKaBtn whileHover={{scale:1.02}} onClick={onKakaoLogin}>
                <KaKaoImg src={kaKao}/>
                카카오 로그인
              </KaKaBtn>
            </StartKakaDiv>
          </Form>
        </SecUpperDiv>
      </Wrap>
    </UpperDiv>
  );
}

export default ToLogIn;

const UpperDiv = styled(motion.div)`
  height: 100vh;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f4f7f9;
`;
const Wrap = styled(motion.div)`
  width: 380px;
  height: 470px;
  border: 2px solid transparent;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;
const SecUpperDiv = styled(motion.div)`
  width: 380px;
  height:430px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius:10px;
  background-color: white;
`;
const SignSec = styled(motion.div)`
  width: 350px;
  height:70px;
  border: 1px solid transparent;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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
`;
const SignTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 27px;
  font-weight: 600;
`;
const SignSubTitle = styled.div`
  color:gray;
  font-size:12px;
`
const Form = styled(motion.form)`
`;
const InputField = styled(motion.div)`
  width: 360px;
  height: 55px;
  display : flex;
  justify-content : center;
  align-items : center;
`;
const InputDiv =styled(motion.div)`
  width: 320px;
  height: 45px;
  border: 1px solid white;
  display: flex;
`;
const Input = styled(motion.input)`
  width: 310px;
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
  height: 80px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Login = styled(motion.button)`
  width: 320px;
  height: 40px;
  border: 2px solid transparent;
  border-radius: 3px;
  background-color: #008cff;
  color:white;
  font-weight: 800;
  margin:15px 0px 20px 0px;
  cursor: pointer;
`;
const Sign = styled(motion.div)`
  width: 155px;
  height: 38px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e9eef2;
  font-weight: 800;
  font-size: 14px;
  cursor: pointer;
`;
const StartKakaDiv = styled(motion.div)`
  width: 330px;
  height: 60px;
  margin: 10px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
const KaKaBtn = styled(motion.div)`
  width: 155px;
  height: 40px;
  border: 1px solid transparent;
  border-radius: 3px;
  background-color: #FEE500;
  font-size: 14px;
  font-weight: 800;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const LogInLine = styled.div`
  border: 0.2px solid transparent;
  background-color: lightgray;
  width:320px;
  margin: auto;
`;
const KaKaoImg = styled.img`
  border: 1px solid transparent;
  width:20px;
  height:20px;
  margin-right:5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;