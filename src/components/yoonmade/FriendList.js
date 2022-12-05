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
  position: absolute;
  top:-13%;
  right:146%;
`;

const FriendTitle = styled.div`
  margin:5% 12%;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    height: 100%;
    pointer-events: visible;
    cursor: pointer;
  }

  span {
    width: 40%;
    display: flex;
    align-items: center;
    font-size: 1.2em;
    font-weight: bold;
    margin-left:10%;
    user-select: none;
  }
  `;

  const Header = styled.div`
    width: 88%;
    height: 6%;
    margin:5% 6%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.8em;
    position: relative;
  `;

  const Body = styled.div`
    height: 71%;
  `;

  const BodyMain = styled.div`
    height: 109%;
    padding: 0 1em;
    user-select: none;
    overflow-y:auto;

  ::-webkit-scrollbar {
    border-radius: 5px;
    background-color: #E9EEF2;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #AAAFB5;
  }
  ::-webkit-scrollbar-track {
    border-radius: 5px;
  }
`;