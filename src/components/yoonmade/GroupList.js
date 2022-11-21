import styled from "styled-components";

const GroupList = ({ showFriendCom, showSearchCom, friendGroup }) => {
  return (
    <>
      <GroupHeader>
        <Button>친구그룹</Button>
        <Button onClick={showFriendCom}>내친구</Button>
        <Button onClick={showSearchCom}>검색하기</Button>
      </GroupHeader>
      <GroupBody>
        <SearchInput />
        <GroupItemBox>
          <GroupItemWrapper></GroupItemWrapper>
          <GroupItemWrapper></GroupItemWrapper>
          <GroupItemWrapper></GroupItemWrapper>
          <GroupItemWrapper></GroupItemWrapper>
          <GroupItemWrapper></GroupItemWrapper>
          <GroupItemWrapper></GroupItemWrapper>
        </GroupItemBox>
      </GroupBody>
    </>
  );
};

export default GroupList;

const GroupHeader = styled.div`
  display: flex;
  font-size: 25px;
  gap: 20px;
`;

const Button = styled.div`
  cursor: pointer;
`;

const GroupBody = styled.div`
  height: 100%;
  width: 100%;
  margin-top: 20px;
  padding: 15px;
`;

const GroupItemBox = styled.div`
  height: 95%;
  width: 80%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const GroupItemWrapper = styled.div`
  background-color: teal;
`;

const SearchInput = styled.input`
  height: 5%;
  width: 100%;
`;
