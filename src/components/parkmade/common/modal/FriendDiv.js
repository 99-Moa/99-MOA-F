import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import plus from "../../../../img/Icon_Group_add.png"
import defaultImg from "../../../../img/Icon_Profile.png"

const FriendDiv = ({img, name, inviteList, setInviteList, setIsTargetSearch}) => {
  const addInviteList = () => {
    if (inviteList.length) {
      for (let prop of inviteList) {
        if (prop === name) {
          alert("이미 목록에 추가 되있습니다.");
          return;
        }
      }
      setInviteList([...inviteList, name]);
      setIsTargetSearch(false);
    } else {
      setInviteList([...inviteList, name]);
      setIsTargetSearch(false)
    }
  };
  return (
    <Wrap>
      <ImgDiv>
        <Img src={img}/>
      </ImgDiv>
      <NickNameDiv>
        <NickName>
          {name}
        </NickName>
      </NickNameDiv>
      <PlusIconDiv>
        {!inviteList.find(prop => prop === name) && <PlusIconImg src={plus} onClick={addInviteList}/>}
      </PlusIconDiv>
    </Wrap>
  );
}

export default React.memo(FriendDiv);

const Wrap = styled.div`
  width: 100%;
  height: 9%;
  display: flex;
`;
const ImgDiv = styled.div`
  width: 15%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Img = styled.img`
  max-width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NickNameDiv = styled.div`
  width: 75%;
  height: 100%;
  display: flex;
  align-items: center;
`;
const NickName = styled.span`
`;
const PlusIconDiv = styled.div`
  width: 10%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PlusIconImg = styled.img`
  cursor: pointer;
`;
