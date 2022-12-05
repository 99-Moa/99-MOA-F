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
            <img src={userInfo.imgUrl} alt="userImg" />
            <span className="userName">{userInfo.friendUsername}</span>
            <span className="userId">{userInfo.userId}</span>
            <div onClick={onAddFriend}>친구추가</div>
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
  width:90%;
  margin: 8.5% 7%;
  display: flex;
  align-items: center;

  svg {
    height: 100%;
    cursor: pointer;
  }

  span {
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 1.2em;
    font-weight: bold;
    position: absolute;
    left: 38%;
    right: 53%;
    user-select: none;
  }
`;

const Header = styled.div`
  height: 30%;
  width: 90%;
  margin-bottom: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8em;
`;

const Body = styled.div`
  width:90%;
  height: 400%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FriendWrapper = styled.div`
  margin-top: 3em;
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;

  img {
    height: 5em;
    width: 5em;
    border-radius: 50%;
    margin-bottom: 0.5em;
    object-fit: cover;
  }

  .userName {
    font-size: 1.2em;
  }

  .userId {
    font-size: 0.8em;
    color: ${defaultColor.darkGrey};
  }

  div {
    width:170%;
    padding: 1em 3em;
    margin-top: 4em;
    display: flex;
    justify-content: center;
    border-radius: 0.3em;
    background-color: ${defaultColor.red};
    color: white;
  }
`;

const NotFriendWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2em;

  img {
    height: 2em;
    width: 2em;
    opacity: 0.4;
  }
  span {
    font-size: 1em;
    font-weight: 400;
    color: ${defaultColor.darkGrey};
    margin-bottom: 5em;
  }
`;