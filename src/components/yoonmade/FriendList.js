import { useState } from "react";
import { useMutation } from "react-query";
import styled from "styled-components";
import { deleteFriend } from "../../api/memberManage";
import InputComponent from "./InputComponent";
import { defaultColor } from "./styles";

const FriendList = ({ goBack, friendList }) => {
  const [friendName, setFriendName] = useState("");
  const [filterFriendList, setFilterFriendList] = useState([]);

  const { mutate } = useMutation(deleteFriend, {
    onSuccess: () => {
      alert("친구삭제 완료!");
    },
  });

  // 로직
  const onChangeFriendInput = (e) => {
    const value = e.target.value;
    const filterList = friendList.data.filter(({ friendUsername }) => {
      return friendUsername.includes(value);
    });

    setFilterFriendList(filterList);
    setFriendName(value);
  };
  const onDeleteFriend = (id) => {
    mutate(id);
    setFilterFriendList(
      filterFriendList.filter((friendInfo) => friendInfo.id !== id)
    );
  };

  return (
    <>
      <Header>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#000000"
          onClick={goBack}
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
        <span>친구목록</span>
        <InputComponent
          placeholder="닉네임"
          onChange={onChangeFriendInput}
          value={friendName}
        />
      </Header>
      <Body>
        <BodyHeader>
          <span className="name">NAME</span>
          <span className="id">ID</span>
          <span className="delete"></span>
        </BodyHeader>
        <BodyMain>
          {filterFriendList.length >= 1 || friendName
            ? filterFriendList.map((friendInfo) => (
                <UserWrapper>
                  <ImgAndName>
                    <img src={friendInfo.imgUrl} alt="userImg" />
                    <span>{friendInfo.friendUsername}</span>
                  </ImgAndName>
                  <span>ID1234</span>
                  <DeleteWrapper>
                    <span className="text">삭제</span>
                    <span
                      className="btn"
                      onClick={() => onDeleteFriend(friendInfo.id)}
                    >
                      ⊖
                    </span>
                  </DeleteWrapper>
                </UserWrapper>
              ))
            : friendList?.data.map((friendInfo) => (
                <UserWrapper>
                  <ImgAndName>
                    <img src={friendInfo.imgUrl} alt="userImg" />
                    <span>{friendInfo.friendUsername}</span>
                  </ImgAndName>
                  <span>ID1234</span>
                  <DeleteWrapper>
                    <span className="text">삭제</span>
                    <span
                      className="btn"
                      onClick={() => onDeleteFriend(friendInfo.id)}
                    >
                      ⊖
                    </span>
                  </DeleteWrapper>
                </UserWrapper>
              ))}
        </BodyMain>
      </Body>
      {/* <FirendListHeader>
        <button onClick={goBack}>뒤로</button>
        <FrinedListTitle>내 친구</FrinedListTitle>
      </FirendListHeader>
      <FriendInputWrapper>
        <FriendInput value={friendName} onChange={onChangeFriendInput} />
        <SearchBtn>
            <Svg aria-label="검색" color="#8e8e8e" fill="#8e8e8e" height="16" role="img" viewBox="0 0 24 24" width="16">
              <path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.511" x2="22" y1="16.511" y2="22"></line>
            </Svg>
          </SearchBtn>
      </FriendInputWrapper>
      <FriendListBox>
        {filterFriendList.length >= 1 || friendName
          ? filterFriendList?.map((friendInfo) => (
              <FriendWrapper>
                <FriendImg src={friendInfo.imgUrl} />
                <FriendName>{friendInfo.friendUsername}</FriendName>
                <DeleteBtn onClick={() => onDeleteFriend(friendInfo.id)}>
                  <span>삭제</span>
                </DeleteBtn >
              </FriendWrapper>
            ))
          : friendList?.data.map((friendInfo) => (
              <FriendWrapper>
                <FriendImg src={friendInfo.imgUrl} />
                <FriendName>{friendInfo.friendUsername}</FriendName>
                <DeleteBtn
                  onClick={() => onDeleteFriend(friendInfo.id)}
                >
                  <span>삭제</span>
                </DeleteBtn>
              </FriendWrapper>
            ))}
      </FriendListBox> */}
    </>
  );
};

export default FriendList;

const Header = styled.div`
  height: 5%;
  width: 100%;
  margin-bottom: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.8em;
  position: relative;

  svg {
    height: 100%;
  }

  span {
    width: 10%;
    display: flex;
    align-items: center;
    font-size: 1.2em;
    font-weight: bold;
    position: absolute;
    left: 47%;
    right: 53%;
  }
`;

const Body = styled.div`
  height: 100%;

  border: 1px solid ${defaultColor.lightGrey};
`;

const BodyHeader = styled.div`
  height: 5%;
  margin-bottom: 1em;
  padding: 0 2em;
  display: grid;
  grid-template-columns: 30% 50% 20%;
  align-items: center;
  background-color: ${defaultColor.lightGrey};
  font-size: 1em;
  font-weight: 300;
`;

const BodyMain = styled.div`
  height: 95%;
  padding: 0 2em;
  user-select: none;
`;

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

// const FriendInputWrapper = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   position: relative;
// `;

// const FriendInput = styled.input`
//   margin: 20px 0px;
//   width: 80%;
//   text-align: center;
//   padding: 2%;
// `;

// const FirendListHeader = styled.div`
//   height: 50px;
//   width: 100%;
//   border: 1px solid black;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   h1 {
//     font-size: 20px;
//     position: absolute;
//   }

//   button {
//     margin-right: auto;
//   }
// `;

// const FrinedListTitle = styled.h1``;

// const FriendListBox = styled.div`
//   height: calc(95% - 100px);
//   width: 80%;
//   margin: 0 auto;
//   padding: 20px;
//   border: 1px solid black;
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
//   overflow: auto;
// `;

// const FriendWrapper = styled.div`
//   height: 50px;
//   width: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// `;

// const FriendImg = styled.img`
//   height: 50px;
//   width: 50px;
//   border-radius: 50%;
// `;

// const FriendName = styled.div``;

// const DeleteBtn = styled.div`
//   height: 100%;
//   width: 10%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const Svg = styled.svg`
//   width: 80%;
//   height: 80%;
// `;

// const SearchBtn = styled.button`
//   height: 100%;
//   width: 7%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: transparent;
//   border: none;
//   cursor: pointer;
//   position: absolute;
//   right: 10%;
// `;
