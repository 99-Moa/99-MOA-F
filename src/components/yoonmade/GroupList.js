import InputComponent from "./InputComponent";
import styled from "styled-components";
import GroupInfo from "./GroupInfo";
import { defaultColor } from "./styles";
import emoji from "../../img/Sunglasses_emoji.png";

const GroupList = ({ showFriendCom, showSearchCom, friendGroup }) => {
  return (
    <>
      <Header>
        <Button onClick={showFriendCom}>친구목록</Button>
        <Button onClick={showSearchCom}>친구추가</Button>
        <InputComponent placeholder="그룹 검색" />
      </Header>
      {!friendGroup?.length ? (
        <NotGropuWrapper>
          <img src={emoji} alt="emoji" />
          <span>새로운 그룹을 등록해주세요.</span>
        </NotGropuWrapper>
      ) : (
        <Body>
          {friendGroup.map((group) => (
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
  cursor: pointer;
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
