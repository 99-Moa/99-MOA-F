import InputComponent from "./InputComponent";
import styled from "styled-components";
import GroupInfo from "./GroupInfo";
import { defaultColor } from "./styles";
import emoji from "../../img/Sunglasses_emoji.png";
import { motion } from "framer-motion";
import FriendList from "./FriendList";
import SearchFriend from "./SearchFriend";
import { useState } from "react";

const GroupList = ({ friendGroup, friendList }) => {
  const [showFriend, setShowFriend] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const showSearchCom = () => {
    setShowSearch(prev => !prev);
    setShowFriend(false);
  };
  const showFriendCom = () => {
    setShowFriend(prev => !prev);
    setShowSearch(false);
  };
  return (
    <>
      <Header>
        <UpperFriendDiv>
          <FriendListDiv $showFriend={showFriend} onClick={showFriendCom}>
              친구목록
          </FriendListDiv>
          <AddFriendDiv $showSearch={showSearch} onClick={showSearchCom}>
              친구추가
          </AddFriendDiv>
          {showFriend &&
            <Container left="0%" initial={{ opacity: 1, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 0 }} >
              <FriendList friendList={friendList} />
            </Container>
          }
          {showSearch &&
            <Container left="55%" initial={{ opacity: 1, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 0 }} >
              <SearchFriend />
            </Container>
          }
        </UpperFriendDiv>
        <InputComponent width={"35%"} placeholder="그룹 검색" />
      </Header>
      {!friendGroup?.length ?
        <NotGroup>
          <img src={emoji} alt="emoji" />
          <span>새로운 그룹을 등록해주세요.</span>
        </NotGroup>
        : 
        <HaveGroup>
          {friendGroup.map((group) => (
            <GroupInfo group={group} key={group.groupId} />
          ))}
        </HaveGroup>
      }
    </>
  );
};

export default GroupList;

const Header = styled.div`
  width: 100%;
  height: 4.5%;
  margin-bottom: 1.5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const UpperFriendDiv = styled.div`
  height: 100%;
  width: 15%;
  display: flex;
  justify-content: space-between;
  position: relative;
`;
const FriendListDiv = styled.div`
  height: 100%;
  width:45%;
  border: 1px solid ${defaultColor.darkGrey};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${prop => prop.$showFriend ? "#E9EEF2" : "white"};
  font-size: 100%;
  cursor: pointer;
`;
const AddFriendDiv = styled.div`
  height: 100%;
  width:45%;
  border: 1px solid ${defaultColor.darkGrey};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${prop => prop.$showSearch ? "#E9EEF2" : "white"};
  font-size: 100%;
  cursor: pointer;
`;
const Container = styled(motion.div)`
  height: 1600%;
  width: 200%;
  top: 170%;
  left: ${prop => prop.left};
  position: absolute;
  z-index: 15;
`;
const NotGroup = styled.div`
  height: 94%;
  width: 100%;
  border: 1px solid ${defaultColor.lightGrey};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5%;

  img {
    height: 5%;
    max-width: 5%;
    opacity: 0.4;
  }
  span {
    font-size: 130%;
    font-weight: 400;
    color: ${defaultColor.darkGrey};
  }
`;
const HaveGroup = styled.div`
  height: 94%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, auto));
  grid-auto-rows: 180px;
  gap: 1em;
  position: relative;
  z-index: 5;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
  display: none;
}
`;
