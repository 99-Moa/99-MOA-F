import { useState } from "react";
import { useMutation } from "react-query";
import styled from "styled-components";
import { deleteFriend } from "../../api/memberManage";
import FriendInfo from "./FriendInfo";
import InputComponent from "./InputComponent";
import { defaultColor } from "./styles";

const FriendList = ({ friendList }) => {
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
    <Container>
      <FriendTitle>
        <span>친구목록</span>
      </FriendTitle>
      <Header>
        <InputComponent
          width={"95%"}
          placeholder="닉네임"
          onChange={onChangeFriendInput}
          value={friendName}
        />
      </Header>
      <Body>
        <BodyMain>
          {filterFriendList.length >= 1 || friendName
            ? filterFriendList.map((friendInfo) => (
              <FriendInfo
                friendInfo={friendInfo}
                onDeleteFriend={onDeleteFriend}
                key={friendInfo.id}
              />
            ))
            : friendList?.data.map((friendInfo) => (
              <FriendInfo
                friendInfo={friendInfo}
                onDeleteFriend={onDeleteFriend}
                key={friendInfo.id}
              />
            ))}
        </BodyMain>
      </Body>
    </Container>
  );
};

export default FriendList;

const Container = styled.div`
  width:150%;
  height:600%;
  border:1px solid ${defaultColor.lightGrey};
  border-radius: 2px;
  box-shadow: 0px 0px 10px lightgray;
  background-color: white;
`;
const FriendTitle = styled.div`
  width:80%;
  margin:5% 10%;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    display: flex;
    align-items: center;
    font-size: 120%;
    font-weight: bold;
    user-select: none;
  }
  `;
const Header = styled.div`
  width: 88%;
  height: 7%;
  margin:5% 6%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Body = styled.div`
  width:88%;
  height: 71%;
  margin-left: 4%;
`;
const BodyMain = styled.div`
  height: 100%;
  padding: 0 5%;
  user-select: none;
  overflow-y:auto;
  flex-grow: 0;
  flex-shrink: 0;

  ::-webkit-scrollbar {
    border-radius: 8px;
    background-color: #E9EEF2;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: #AAAFB5;
  }
  ::-webkit-scrollbar-track {
    border-radius: 8px;
  }
`;