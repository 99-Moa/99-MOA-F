import { useState } from "react";
import styled from "styled-components";
import { useMutation, useQuery } from "react-query";
import iconGroupAdd from "../../../../img/Icon_Group_add.png"
import { useForm } from "react-hook-form";

const NewMeet = ({  }) => {
  const { register, handleSubmit, getValues, setValue } = useForm();
  // const { mutate: friendsSearch } = useQuery(, {
  //   onSuccess: () => {
  //     alert("친구찾기가 완료되었습니다.")
  //     setFriendsList([friendsList]);
  //   },
  //   onError: () => {
  //     alert("친구를 찾을 수 없습니다.")
  //     setFriendsList([]);
  //   },
  // });
  const makeGroup = () => {
  }
  const toSearchFriends = () => {

  };
  // const deleteUser = (receiveUserName) => {
  //   const newGroup = userNameArr.filter((user) => user.friendUserName !== receiveUserName);
  //   setUserNameArr(newGroup)
  // };

  return (
    <Form onSubmit={handleSubmit(makeGroup)}>
      <FindFriend {...register("findNickName")} placeholder="닉네임 검색" onChange={toSearchFriends}/>
      <ResultFriendDiv>
        {"검색이 완료되면 뜨게끔"}
        <ResultFriend >
          <FriendImg src={null} />
          <FriendName>
            {"이름이 들어가는곳 "}
          </FriendName>
          <FriendPlus>
            <PlusIcon src={iconGroupAdd} onClick={null} />
          </FriendPlus>
        </ResultFriend>
      </ResultFriendDiv>
      <InviteDiv>
        <Invite>
          초대
        </Invite>
        <InviteListDiv>
          {/* {userNameArr.map((prop, index) => <Meet key={index} prop={prop} deleteUser={deleteUser} />)} */}
        </InviteListDiv>
      </InviteDiv>
      <MakeGroupBtn>
        그룹 생성
      </MakeGroupBtn>
    </Form>
  );
};

export default NewMeet;

const Form = styled.form`
  width: 80%;
  height: 90%;
  margin: 7% 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const FindFriend = styled.input`
  height: 8%;
  width: 100%;
  border: 1px solid transparent;
  border-radius: 5px;
  background-color: #e9eef2;
  font-size: 100%;
  text-indent: 4%;
  &:focus {
    border: 2px solid #008cff;
    outline: none;
  };
`;
const ResultFriendDiv = styled.div`
  width: 100%;
  height: 55%;
  border-bottom: 2px solid #AAAFB5;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
`;
const ResultFriend = styled.div`
  width: 100%;
  height: 17%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const FriendImg = styled.img`
  width: 16%;
  height: 96%;
  border-radius: 50%;
  background-color: #e9eef2;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FriendName = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 100%;
`;
const FriendPlus = styled.div`
  width: 15%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;
const PlusIcon = styled.img`
  cursor: pointer;
`;
const InviteDiv = styled.div`
  width: 100%;
  height: 15%;
  margin-top: 3%;
`;
const Invite = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  align-items: center;
  font-size: 100%;
  font-weight: 600;
`;
const InviteListDiv = styled.div`
  width: 100%;
  height: 92%;
  display: flex;
  align-items: center;
  overflow-y: auto;
  gap:2%;
`;
const MakeGroupBtn = styled.button`
  width: 100%;
  height: 10%;
  margin-top:1%;
  border-radius: 8px;
  background-color: #27292D;
  font-size: 90%;
  color: white;
`;