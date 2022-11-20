import { useEffect } from "react";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { kakaoLogin } from "../../api/memberManage";
import Loading from "../parkmade/common/loading/Loading";

const KakaoRedirectHandler = () => {
  const navigate = useNavigate()
  // 인가코드
  let code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    const data = kakaoLogin(code)
    if (data.success) {
      localStorage.setItem("access_token", data.headers.access_token);
      localStorage.setItem("refresh_token", data.headers.refresh_token);
      navigate("/main");
    }
  }, [])

  return (
    <Loading />
  );
};

export default KakaoRedirectHandler;
