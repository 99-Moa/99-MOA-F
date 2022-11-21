import { useState } from "react";
import { useMutation } from "react-query";
import styled from "styled-components";
import { deleteFriend } from "../../api/memberManage";

const FriendList = ({ goBack,friendList }) => {
  const [friendName, setFriendName] = useState("");
  const [filterFriendList, setFilterFriendList] = useState([]);

  const { mutate } = useMutation(deleteFriend, {
    onSuccess: () => {
        alert("친구삭제 완료!")
    },
  });

  // 로직
  const onChangeFriendInput = (e) => {
    const value = e.target.value;
    const filterList = friendList.data.filter(({ friendUsername }) => {
      return friendUsername.includes(value);
    });

    setFilterFriendList(filterList);
    setFriendName(value);
  };
  const onDeleteFriend = (id) => {
    mutate(id);
    setFilterFriendList(filterFriendList.filter((friendInfo) => friendInfo.id !== id))
  };


  return (
    <>
      <FirendListHeader>
        <button onClick={goBack}>뒤로</button>
        <FrinedListTitle>내 친구</FrinedListTitle>
      </FirendListHeader>
      <FriendInputWrapper>
        <FriendInput value={friendName} onChange={onChangeFriendInput} />
        <SearchBtn>
            <Svg aria-label="검색" color="#8e8e8e" fill="#8e8e8e" height="16" role="img" viewBox="0 0 24 24" width="16">
              <path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.511" x2="22" y1="16.511" y2="22"></line>
            </Svg>
          </SearchBtn>
      </FriendInputWrapper>
      <FriendListBox>
        {filterFriendList.length >= 1 || friendName
          ? filterFriendList?.map((friendInfo) => (
              <FriendWrapper>
                <FriendImg src={friendInfo.imgUrl} />
                <FriendName>{friendInfo.friendUsername}</FriendName>
                <DeleteBtn onClick={() => onDeleteFriend(friendInfo.id)}>
                  <span>삭제</span>
                </DeleteBtn >
              </FriendWrapper>
            ))
          : friendList?.data.map((friendInfo) => (
              <FriendWrapper>
                <FriendImg src={friendInfo.imgUrl} />
                <FriendName>{friendInfo.friendUsername}</FriendName>
                <DeleteBtn
                  onClick={() => onDeleteFriend(friendInfo.id)}
                >
                  <span>삭제</span>
                </DeleteBtn>
              </FriendWrapper>
            ))}
      </FriendListBox>
    </>
  );
};

export default FriendList;

const FriendInputWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
`;

const FriendInput = styled.input`
  margin: 20px 0px;
  width: 80%;
  text-align: center;
  padding: 2%;
`;

const FirendListHeader = styled.div`
  height: 50px;
  width: 100%;
  border: 1px solid black;
  display: flex;
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

const FrinedListTitle = styled.h1``;

const FriendListBox = styled.div`
  height: calc(95% - 100px);
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow: auto;
`;

const FriendWrapper = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FriendImg = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`;

const FriendName = styled.div``;

const DeleteBtn = styled.div`
  height: 100%;
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Svg = styled.svg`
  width: 80%;
  height: 80%;
`;

const SearchBtn = styled.button`
  height: 100%;
  width: 7%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 10%;
`;