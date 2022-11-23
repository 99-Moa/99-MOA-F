import styled from "styled-components";
import { defaultColor } from "./styles";

const FriendInfo = ({ friendInfo, onDeleteFriend }) => {
  return (
    <UserWrapper>
      <ImgAndName>
        <img src={friendInfo.imgUrl} alt="userImg" />
        <span>{friendInfo.friendUsername}</span>
      </ImgAndName>
      <span>{friendInfo.userId}</span>
      <DeleteWrapper>
        <span className="text">삭제</span>
        <span className="btn" onClick={() => onDeleteFriend(friendInfo.id)}>
          ⊖
        </span>
      </DeleteWrapper>
    </UserWrapper>
  );
};

export default FriendInfo;

const UserWrapper = styled.div`
  height: 10%;
  display: grid;
  grid-template-columns: 30% 50% 20%;
  align-items: center;
  font-weight: 300;
`;

const ImgAndName = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;

  img {
    height: 3em;
    width: 3em;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const DeleteWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.3em;

  &:hover {
    color: ${defaultColor.red};
  }

  .text {
    font-size: 0.8em;
  }

  .btn {
    padding-bottom: 0.1em;
    display: flex;
    align-items: center;
    font-size: 1.2em;
  }
`;
