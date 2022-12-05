import { useState } from "react";
import { useMutation } from "react-query";
import styled from "styled-components";
import { getMyFriend, postPlusFriend } from "../../api/memberManage";
import InputComponent from "./InputComponent";
import { defaultColor } from "./styles";
import emoji from "../../img/Sunglasses_emoji.png";

const SearchFriend = ({ goBack }) => {
  const [userName, setUserName] = useState("");
  const [userInfo, setUserInfo] = useState();

  const { mutate: searchMutate } = useMutation(getMyFriend, {
    onSuccess: ({ success, data, error }) => {
      if (success) {
        setUserInfo(data);
      } else {
        alert(error.detail);
      }
    },
  });
  const { mutate: addMutate } = useMutation(postPlusFriend, {
    onSuccess: ({ success, error }) => {
      if (success) {
        alert("친구추가 완료!");
        goBack();
      } else {
        alert(error.detail);
      }
    },
  });

  const onChangeSerachInput = (e) => {
    const value = e.target.value;
    setUserName(value);
  };

  const onSearchFriend = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (!userName.trim()) {
        alert("친구이름을 입력해주세요!");
        return;
      }
      searchMutate(userName);
    }
  };
  const onAddFriend = () => {
    const user = {
      userName: userInfo.friendUsername,
    };
    addMutate(user);
  };
  return (
    <Container>
      <SearchTitle>
        <span>친구검색</span>
      </SearchTitle>
      <Header>
        <InputComponent
          placeholder="닉네임"
          value={userName}
          width={"95%"}
          onChange={onChangeSerachInput}
          onKeyPress={onSearchFriend}
          iconClick={onSearchFriend}
        />
      </Header>
      <Body>
        {userInfo ? (
          <FriendWrapper>
            <UserImg src={userInfo.imgUrl} alt="userImg" />
            <UserName className="userName">{userInfo.friendUsername}</UserName>
            <UserId className="userId">{userInfo.userId}</UserId>
            <FriendAdd onClick={onAddFriend}>친구추가</FriendAdd>
          </FriendWrapper>
        ) : (
          <NotFriendWrapper>
            <img src={emoji} alt="emoji" />
            <span>새로운 친구를 등록해주세요.</span>
          </NotFriendWrapper>
        )}
      </Body>
    </Container>
  );
};

export default SearchFriend;
//ss
const Container = styled.div`
  width:150%;
  height:600%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border:1px solid ${defaultColor.lightGrey};
  border-radius: 2px;
  box-shadow: 0px 0px 10px lightgray;
  background-color: white;
  overflow: hidden;
`;

const SearchTitle = styled.div`
  width:80%;
  height:5%;
  margin: 6% 8%;
  display: flex;
  align-items: center;

  span {
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 120%;
    font-weight: bold;
    position: absolute;
    top:30%;
    left: 57%;
    user-select: none;
  }
`;
const Header = styled.div`
  width: 90%;
  height: 7%;
  margin-bottom: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Body = styled.div`
  width:100%;
  height: 75%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FriendWrapper = styled.div`
  width:100%;
  height:100%;
  margin-top: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
  flex-grow: 0;
  flex-shrink: 0;
`;
const UserImg = styled.img`
  width: 25%;
  height:25%;
  border-radius: 50%;
  margin-bottom: 3%;
  object-fit: cover; 
`;
const UserName = styled.div`
  font-size: 120%;
`;
const UserId = styled.div`
  font-size: 80%;
  color: ${defaultColor.darkGrey};
`;
const FriendAdd = styled.div`
  width:90%;
  padding: 5%;
  margin-top: 20%;
  display: flex;
  justify-content: center;
  border-radius: 4px;
  background-color: ${defaultColor.red};
  color: white;
`;
const NotFriendWrapper = styled.div`
  margin-top: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 10%;
    height: 20%;
    margin-bottom: 5%;
    opacity: 0.4;
  }
  span {
    font-size: 90%;
    font-weight: 400;
    color: ${defaultColor.darkGrey};
    margin-bottom: 50%;
  }
`;