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
  const onDeleteFriend = (nickname) => {
    mutate(nickname);
  };


  return (
    <>
      <FirendListHeader>
        <button onClick={goBack}>뒤로</button>
        <FrinedListTitle>내 친구</FrinedListTitle>
      </FirendListHeader>
      <FriendInputWrapper>
        <FriendInput value={friendName} onChange={onChangeFriendInput} />
      </FriendInputWrapper>
      <FriendListBox>
        {filterFriendList.length >= 1 || friendName
          ? filterFriendList?.map((friendInfo) => (
              <FriendWrapper>
                <FriendImg src={friendInfo.imgUrl} />
                <FriendName>{friendInfo.friendUsername}</FriendName>
                <DeleteBtn>
                  <span>삭제</span>
                </DeleteBtn>
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
  height: 100%;
  width: 10%;
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
