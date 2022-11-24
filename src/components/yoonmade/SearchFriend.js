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
    <>
      <Header>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#000000"
          onClick={goBack}
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
        <span>친구검색</span>
        <InputComponent
          placeholder="닉네임"
          value={userName}
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
    </>
  );
};

export default SearchFriend;

const Header = styled.div`
  height: 5%;
  width: 100%;
  margin-bottom: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.8em;
  position: relative;

  svg {
    height: 100%;
  }

  span {
    width: 10%;
    display: flex;
    align-items: center;
    font-size: 1.2em;
    font-weight: bold;
    position: absolute;
    left: 47%;
    right: 53%;
  }
`;

const Body = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${defaultColor.lightGrey};
`;

const FriendWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;

  img {
    height: 10em;
    width: 10em;
    border-radius: 50%;
    margin-bottom: 1em;
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
    padding: 0.2em 0.7em;
    margin-top: 0.8em;
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
    font-size: 1.3em;
    font-weight: 400;
    color: ${defaultColor.darkGrey};
  }
`;
