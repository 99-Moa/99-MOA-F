import React from "react";
import styled from "styled-components";
import cancel from "../../../../img/Icon_Group_cancel.png"

const InvitedFriend = ({name, inviteList, setInviteList}) => {
  const deleteList = () => {
    setInviteList(inviteList.filter(prop => prop !== name));
  }
  return (
    <UpperDiv>
      <NameSpan>
        {name}
      </NameSpan>
      <XImg src={cancel} onClick={deleteList}/>
    </UpperDiv>
  );
}
export default React.memo(InvitedFriend);

const UpperDiv = styled.div`
  height: 60%;
  width: 30%;
  border: 1px solid;
  border-radius: 10px;
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  justify-content: space-between;
  align-items: center;
`;
const NameSpan = styled.span`
  font-size: 70%;
  margin-left: 5%;
`;
const XImg = styled.img`
  height: 70%;
  max-width: 100%;
  cursor: pointer;
`;