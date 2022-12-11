import { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { postMakeGroup } from "../../api/schedulesManage";
import { toggleChoiceGroup } from "../../store/modules/toggleModal";

import InvitedFriend from "./InvitedFriend";
import FriendDiv from "./FriendDiv";

import logoImg from "../../img/icons/Logo_Main.png"
import cancel from "../../img/icons/Icon_Group_cancel.png"

const MakeGroup = ({myFriendsList}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register:searchRegister, handleSubmit:searchHandle, setValue:searchSetValue } = useForm();
  const [isTargetSearch, setIsTargetSearch] = useState(false);
  const [resultF, setResultF] = useState({});
  const [inviteList, setInviteList] = useState([]);
  const [groupN, setGroupN] = useState("");
  const { mutate } = useMutation(postMakeGroup, {
    onSuccess: (res) => {
      alert("그룹생성 완료!");
      dispatch(toggleChoiceGroup(false));
      navigate("/myFriends");
    }
  });
  const onChange = (ev) => {
    setGroupN(ev.target.value)
  }
  const SearchFriends = (formData) => {
    myFriendsList.map(prop=>{
      if (prop.friendUsername === formData.friendsNick) {
        setIsTargetSearch(true);
        setResultF(prop);
      }
    })
  };
  const backToFriendsList = () => {
    setIsTargetSearch(false);
    setResultF({});
    searchSetValue("friendsNick", "");
  };

  const makeGroup = () => {
    if (!inviteList.length) {
      return alert("친구를 초대해주세요!")
    }
    if (!groupN.length) {
      return alert("그룹이름을 적어주세요!")
    }
    mutate({"groupName":groupN, "users":inviteList});
    
  };
  return (
    <Wrap>
      <MakeGroupNameInput placeholder="그룹이름을 적어주세요" onChange={onChange}/>
      <FindFriendDiv>
        <SearchPlaceForm onSubmit={searchHandle(SearchFriends)}>
          <PlaceInput {...searchRegister("friendsNick")} placeholder="친구 닉네임 검색"/>
          <SearchBtn>
            <Svg aria-label="검색" color="#8e8e8e" fill="#8e8e8e" height="16" role="img" viewBox="0 0 24 24" width="16">
              <path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.511" x2="22" y1="16.511" y2="22"></line>
            </Svg>
          </SearchBtn>
        </SearchPlaceForm>
        <BackToList>
          <BackBtnImg src={cancel} onClick={backToFriendsList}/>
        </BackToList>
      </FindFriendDiv>
      <ResultFriendDiv>
        {!isTargetSearch ?
          myFriendsList.length ?
            <>
              <FriendsDiv>
                내 친구 
                <FriendsCount>
                  {myFriendsList.length}
                </FriendsCount>
              </FriendsDiv>
              {myFriendsList.map((prop) => <FriendDiv key={prop.id} img={prop.imgUrl} name={prop.friendUsername} inviteList={inviteList} setInviteList={setInviteList} setIsTargetSearch={setIsTargetSearch} />) }
            </>
            :
            <ZeroFRdiv>
              <LogoImg src={logoImg}/>
              <SaltyDiv>
                아직 친구가 없군요~
              </SaltyDiv>
            </ZeroFRdiv>
          :
          <>
            <FriendsDiv>
              검색결과
            </FriendsDiv>
            <FriendDiv img={resultF.imgUrl} name={resultF.friendUsername} inviteList={inviteList} setInviteList={setInviteList} setIsTargetSearch={setIsTargetSearch} />
          </>
        }
      </ResultFriendDiv>
      <InviteDiv>
        <Invite>
          초대
          <FriendsCount>
            {inviteList.length>0 && inviteList.length}
          </FriendsCount>
        </Invite>
        <InviteListDiv>
          {inviteList.map((prop, index)=><InvitedFriend key={index} name={prop} inviteList={inviteList} setInviteList={setInviteList}/>)}
        </InviteListDiv>
      </InviteDiv>
      <MakeGroupBtn onClick={makeGroup}>
        그룹 생성
      </MakeGroupBtn>
    </Wrap>
  );
};

export default MakeGroup;

const Wrap = styled.div`
  width: 90%;
  height: 93%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const FindFriendDiv = styled.div`
  height: 6%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5%;
`;
const SearchPlaceForm = styled.form`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  margin: 1% 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #E9EEF2;
  position: relative;
`;
const PlaceInput = styled.input`
  height: 100%;
  width: 100%;
  margin: 0px 2%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  font-size: 90%;
  font-weight: 600;
  background-color: transparent;
`;
const SearchBtn = styled.button`
  height: 100%;
  max-width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
const Svg = styled.svg`
  width: 80%;
  height: 80%;
`;
const BackToList = styled.div`
  height: 100%;
  width: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BackBtnImg = styled.img`
  cursor: pointer;
`;
const ResultFriendDiv = styled.div`
  width: 100%;
  height: 55%;
  border-bottom: 2px solid #AAAFB5;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  gap: 3%;
`;
const FriendsDiv = styled.div`
  height: 5%;
  width: 97%;
  margin-left: 3%;
  margin-top: 3%;
  margin-bottom: 1%;
  display: flex;
  align-items: center;
  font-weight: 800;
`;
const ZeroFRdiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10%;
`;
const LogoImg = styled.img`
  width: 30%;
  max-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SaltyDiv = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FriendsCount = styled.span`
  margin-left: 1%;
`;
const InviteDiv = styled.div`
  width: 100%;
  height: 20%;
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
  height: 75%;
  margin-top: 1%;
  display: flex;
  align-items: center;
  overflow-x: auto;
  gap:2%;
`;
const MakeGroupNameInput = styled.input`
  width: 100%;
  height: 7%;
  border: none;
  border-bottom: 1px solid;
  margin-bottom: 4%;
  padding-left: 3%;
  font-size: 100%;
  outline: none;
`;
const MakeGroupBtn = styled.button`
  width: 100%;
  height: 7%;
  border: 1px solid #FF4545;
  border-radius: 5px;
  background-color: #FF4545;
  font-size: 90%;
  color: white;
  cursor: pointer;
`;
