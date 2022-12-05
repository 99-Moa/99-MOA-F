import InputComponent from "./InputComponent";
import styled from "styled-components";
import GroupInfo from "./GroupInfo";
import { defaultColor } from "./styles";
import emoji from "../../img/Sunglasses_emoji.png";
import { useState } from "react";
import { Link } from "react-router-dom";

const GroupList = ({ showFriendCom, showSearchCom, friendGroup }) => {
  const [groupName, setGroupName] = useState("");
  const [filterGroupList, setFilterGroupList] = useState([]);

  const onChangeGroupInput = (e) => {
    const value = e.target.value;
    const filterList = friendGroup.filter(({ groupName }) => {
      return groupName.includes(value);
    });

    setFilterGroupList(filterList);
    setGroupName(value);
  };

  return (
    <>
      <Header>
        <Button onClick={showFriendCom}>친구목록</Button>
        <Button onClick={showSearchCom}>친구추가</Button>
        <InputComponent
          placeholder="그룹 검색"
          onChange={onChangeGroupInput}
          value={groupName}
        />
      </Header>
      {!friendGroup?.length ? (
        // 친구그룹이 존재하지 않을때
        <NotGropuWrapper>
          <img src={emoji} alt="emoji" />
          <span>새로운 그룹을 등록해주세요.</span>
        </NotGropuWrapper>
      ) : (
        // 친구그룹이 1개이상 존재할때
        <Body>
          {filterGroupList.length >= 1 || groupName
            ? // 유저가 input창에서 검색을 하고 있다면
              filterGroupList.map((group) => (
                <GroupInfo group={group} key={group.groupId} />
              ))
            : // 아무것도 검색하고 있지 않다면
              friendGroup.map((group) => (
                <GroupInfo group={group} key={group.groupId} />
              ))}
        </Body>
      )}
    </>
  );
};

export default GroupList;

const Header = styled.div`
  height: 5%;
  width: 100%;
  margin-bottom: 1em;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.8em;
`;

const Button = styled.div`
  height: 100%;
  border: 1px solid ${defaultColor.darkGrey};
  padding: 0 0.6em;
  border-radius: 0.4em;
  display: flex;
  align-items: center;
  font-size: 0.8em;
  user-select: none;
`;

const Body = styled.div`
  height: 95%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, auto));
  grid-auto-rows: 180px;
  gap: 1em;
  overflow: auto;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const NotGropuWrapper = styled.div`
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
