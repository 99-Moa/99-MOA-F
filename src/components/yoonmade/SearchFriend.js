import { useState } from "react";
import { useMutation } from "react-query";
import styled from "styled-components";
import { getMyFriend, postAddFriend } from "../../api/memberManage";

const SearchFriend = ({ goBack }) => {
  const [userName, setUserName] = useState("");
  const [userInfo, setUserInfo] = useState({
    friendUsername: "닉네임",
    imgUrl:
      "https://img.insight.co.kr/static/2020/03/16/700/txyrzifi14lg6auqmo10.jpg",
  });

  const { mutate: searchMutate } = useMutation(getSearchFriend, {
    onSuccess: ({success,data,error}) => {
      if (success) {
        setUserInfo(data);
      } else {
        alert(error.detail);
      }
    },
  });

  const { mutate: addMutate } = useMutation(postAddFriend, {
    onSuccess: ({success,error}) => {
      if(success){
        alert("친구추가 완료!");
        goBack()
      } else {
        alert(error.detail)
      }
    },
  });

  // 로직
  const onChangeSerachInput = (e) => {
    const value = e.target.value;
    setUserName(value);
  };

  const onSearchFriend = () => {
    if (!userName.trim()) {
      alert("친구이름을 입력해주세요!");
      return;
    }
    searchMutate(userName);
  };

  const onAddFriend = () => {
    const user = {
      userName:userInfo.friendUsername
    }
    addMutate(user);
  };

  return (
    <>
      <FriendSearchHeader>
        <button onClick={goBack}>뒤로</button>
        <h1>친구 검색</h1>
      </FriendSearchHeader>
      <FriendSearchBody>
        <SearchInputWrapper>
          <FriendSearchInput onChange={onChangeSerachInput} value={userName} />
          <SearchBtn onClick={onSearchFriend}>검색하기</SearchBtn>
        </SearchInputWrapper>
        <SearchRstProfileWrapper>
          <SearchRstImg src={userInfo.imgUrl} />
          <SerachRstNickName>{userInfo.friendUsername}</SerachRstNickName>
          <SearchRstBtn onClick={onAddFriend}>친구추가</SearchRstBtn>
        </SearchRstProfileWrapper>
      </FriendSearchBody>
    </>
  );
};

export default SearchFriend;

const FriendSearchHeader = styled.div`
  width: 100%;
  display: flex;
  height: 50px;
  border: 1px solid black;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 20px;
    position: absolute;
  }

  button {
    margin-right: auto;
  }
`;

const FriendSearchBody = styled.div`
  height: 50vh;
  border: 1px solid black;
  margin-top: 20px;
  overflow: auto;
  padding: 5px;
`;

const SearchInputWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const FriendSearchInput = styled.input`
  width: 80%;
  padding: 2%;
  text-align: center;
  font-size: 20px;
`;

const SearchBtn = styled.div`
  border: 1px solid black;
  display: flex;
  align-items: center;
`;

const SearchRstProfileWrapper = styled.div`
  margin-top: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SearchRstImg = styled.img`
  height: 30%;
  width: 30%;
  border-radius: 50%;
`;

const SerachRstNickName = styled.h3``;

const SearchRstBtn = styled.div`
  padding: 2%;
  border: 1px solid black;
`;
