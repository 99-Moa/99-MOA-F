import InputComponent from "./InputComponent";
import styled from "styled-components";
import GroupInfo from "./GroupInfo";
import { defaultColor } from "./styles";
import emoji from "../../img/Sunglasses_emoji.png";
import { motion } from "framer-motion";

const GroupList = ({ showFriendCom, showSearchCom, friendGroup, showFriend, showSearch }) => {
  return (
    <>
      <Header>
        <UpperFriendDiv>
          <FriendListDiv $showFriend={showFriend} onClick={showFriendCom}>
              친구목록
          </FriendListDiv>
          {/* 이자리에 */}
          <AddFriendsDiv $showSearch={showSearch} onClick={showSearchCom}>
              친구추가
          </AddFriendsDiv>
          {/* 이자리에 */}
        </UpperFriendDiv>
        <InputComponent placeholder="그룹 검색" />
      </Header>
      {!friendGroup?.length ? 
        <NotGroupWrapper>
          <img src={emoji} alt="emoji" />
          <span>새로운 그룹을 등록해주세요.</span>
        </NotGroupWrapper>
        : 
        <Body>
          {friendGroup.map((group) => (
            <GroupInfo group={group} key={group.groupId} />
          ))}
        </Body>
      }
    </>
  );
};

export default GroupList;

const Header = styled.div`
  height: 5%;
  margin-bottom: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.8em;
`;
const UpperFriendDiv = styled.div`
  width:70%;
  display: flex;
  flex-direction: row;
`;
const FriendListDiv = styled.div`
  width:11%;
  height: 130%;
  padding: 0.3em 0.6em;
  border: 1px solid ${defaultColor.darkGrey};
  border-radius: 0.4em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${prop => prop.$showFriend ? "#E9EEF2" : "white"};
  font-size: 0.8em;
  cursor: pointer;
  position: relative;
`;
const AddFriendsDiv = styled.div`
  width:11%;
  height: 130%;
  padding: 0.3em 0.6em;
  border: 1px solid ${defaultColor.darkGrey};
  border-radius: 0.4em;
  margin-left: 3%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${prop => prop.$showSearch ? "#E9EEF2" : "white"};
  font-size: 0.8em;
  position: relative;
  cursor: pointer;
`;
const Body = styled.div`
  height: 95%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, auto));
  grid-auto-rows: 180px;
  gap: 1em;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
  display: none;
}
`;
const NotGroupWrapper = styled.div`
  height: 100%;
  border: 1px solid ${defaultColor.lightGrey};
  display: flex;
  flex-direction: column;
  justify-content: center;
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