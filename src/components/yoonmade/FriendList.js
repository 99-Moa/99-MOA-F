import { useState } from "react";
import { useMutation } from "react-query";
import styled from "styled-components";
import { deleteFriend } from "../../api/memberManage";
import FriendInfo from "./FriendInfo";
import InputComponent from "./InputComponent";
import { defaultColor } from "./styles";

const FriendList = ({ goBack, friendList }) => {
  const [friendName, setFriendName] = useState("");
  const [filterFriendList, setFilterFriendList] = useState([]);

  const { mutate } = useMutation(deleteFriend, {
    onSuccess: () => {
      alert("친구삭제 완료!");
    },
  });

  const onChangeFriendInput = (e) => {
    const value = e.target.value;
    const filterList = friendList.data.filter(({ friendUsername }) => {
      return friendUsername.includes(value);
    });

    setFilterFriendList(filterList);
    setFriendName(value);
  };
  const onDeleteFriend = (id) => {
    const rst = window.confirm("삭제하시겠습니까?");
    if (rst) mutate(id);
    setFilterFriendList(
      filterFriendList.filter((friendInfo) => friendInfo.id !== id)
    );
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
        <span>친구목록</span>
        <InputComponent
          placeholder="닉네임"
          onChange={onChangeFriendInput}
          value={friendName}
        />
      </Header>
      <Body>
        <BodyHeader>
          <span className="name">NAME</span>
          <span className="id">ID</span>
          <span className="delete"></span>
        </BodyHeader>
        <BodyMain>
          {filterFriendList.length >= 1 || friendName
            ? // 유저가 input창에 검색중일때
              filterFriendList.map((friendInfo) => (
                <FriendInfo
                  friendInfo={friendInfo}
                  onDeleteFriend={onDeleteFriend}
                  key={friendInfo.id}
                />
              ))
            : // 유저가 검색중이지 않을때
              friendList?.data.map((friendInfo) => (
                <FriendInfo
                  friendInfo={friendInfo}
                  onDeleteFriend={onDeleteFriend}
                  key={friendInfo.id}
                />
              ))}
        </BodyMain>
      </Body>
    </>
  );
};

export default FriendList;

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
    pointer-events: visible;
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
  border: 1px solid ${defaultColor.lightGrey};
`;

const BodyHeader = styled.div`
  height: 5%;
  margin-bottom: 1em;
  padding: 0 2em;
  display: grid;
  grid-template-columns: 30% 50% 20%;
  align-items: center;
  background-color: ${defaultColor.lightGrey};
  font-size: 1em;
  font-weight: 300;
`;

const BodyMain = styled.div`
  height: 95%;
  padding: 0 2em;
  user-select: none;
`;
