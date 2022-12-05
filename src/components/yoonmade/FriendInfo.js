import styled from "styled-components";
import { defaultColor } from "./styles";

const FriendInfo = ({ friendInfo, onDeleteFriend }) => {
  return (
    <UserWrapper>
      <ImgAndName>
        <UserImage src={friendInfo.imgUrl} alt="userImg" />
        <User>
          <Name className="userName">{friendInfo.friendUsername}</Name>
          <Id className="userId">{friendInfo.userId}</Id>
        </User>
      </ImgAndName>
      <DeleteWrapper>
        <Delete className="btn" onClick={() => onDeleteFriend(friendInfo.id)}>
          ⊝
        </Delete>
      </DeleteWrapper>
    </UserWrapper>
  );
};

export default FriendInfo;

const UserWrapper = styled.div`
  width:100%;
  height: 18%;
  display: grid;
  grid-template-columns: 30% 69% 20%;
  margin-bottom: 4%;
  align-items: center;
  font-weight: 300;
  
`;
const ImgAndName = styled.div`
  width:90%;
  height:100%;
  display: flex;
  align-items: center;
  gap: 20%;
  

  span {
    display: flex;
    flex-direction: row;
  }
  `;

const UserImage = styled.img`
  width: 82%;
  height:100%;
  border-radius: 50%;
  object-fit: cover;
`;
const Name = styled.div`
  font-size: 120%;
`;
const Id = styled.div`
  color:gray;
`;
const User = styled.div`
`;

const DeleteWrapper = styled.div`
  width:10%;
  margin-left: 95%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30%;

  &:hover {
    color: ${defaultColor.red};
  }
`;

const Delete = styled.div`
  display: flex;
  align-items: center;
  font-size: 120%;
`;