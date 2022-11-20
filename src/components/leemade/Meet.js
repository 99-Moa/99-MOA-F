import React, { useState } from "react";
import styled from "styled-components"
import Icon_Group_cancel_small from "../../img/Icon_Group_cancel_small.png"

const Meet = ({prop,deleteUser}) => {
  const { id ,friendUserName, imgUrl } = prop

  return (
        <Friend onClick={() => deleteUser(friendUserName)}>
          {friendUserName}
          <XButton src={Icon_Group_cancel_small}/>
        </Friend>
    )
};

export default Meet;

const Friend = styled.div`
  width:40%;
  height:57%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid #AAAFB5;
  border-radius: 8px;
  aspect-ratio: auto 4/1;
  font-size: 75%;
  font-weight: 600;
`;

const XButton = styled.img`
  margin-left: 3%;
`;