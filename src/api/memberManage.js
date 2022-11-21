import { axiosIns } from "./api";

// 회원가입, 로그인, 로그아웃, 소셜로그인
export const postLogin = async (userData) => {
  const data = await axiosIns.post("/signin", userData);
  return data;
};
export const postSignUp = async (userData) => {
  const {data} = await axiosIns.post("/signup", userData);
  return data;
};
export const postLogOut = async (userData) => {
  const {data} = await axiosIns.post("/signout", userData); // api 명세서에 딜리트와 포스트가 있다 물어보자
  return data;
};
export const kakaoLogin = async (code) => {
  const data = await axiosIns.get(`/kakao?code=${code}`)
  return data
  }

// 아이디, 닉네임 중복확인
export const postIdDupChecker = async (idName) => {
  const {data} = await axiosIns.post("/userIdCheck", idName);
  return data;
}
export const postNickDupChecker = async (nickname) => {
  const {data} = await axiosIns.post("/userNameCheck", nickname);
  return data;
}

// 내정보 가져오기, 내정보 변경
export const getMyInfo = async () => {
  const {data} = await axiosIns.get("/mypage");
  return data;
}
export const putInfoChange = async (changeData) => {
  const data = await axiosIns.put("/mypage", changeData);
  return data;
}

// 친구 관련
export const getSearchFriend = async (nickname) => {
  const {data} = await axiosIns.get(`/users/${nickname}`);
  return data;
}
export const getFriendList = async () => {
  const {data} = await axiosIns.get("/friends");
  return data;
}
export const postAddFriend = async (nickname) => {
  const {data} = await axiosIns.post(`/friend`, nickname);
  return data;
}
export const getFriendGroup = async () => {
  const {data} = await axiosIns.get("/group");
  return data;
}
export const deleteFriend = async (friendId) => {
  const data = await axiosIns.delete(`/friend/${friendId}`);
  return data;
}
