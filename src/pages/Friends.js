import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getFriendGroup, getMyFriends, getMyInfo } from "../api/memberManage";
import Loading from "../components/parkmade/common/loading/Loading";
import Portal from "../components/parkmade/common/modal/Portal";
import EditMyProfile from "../components/parkmade/common/navigationBar/EditMyProfile";
import NavBar from "../components/parkmade/common/navigationBar/NavBar";
import FriendList from "../components/yoonmade/FriendList";
import GroupList from "../components/yoonmade/GroupList";
import SearchFriend from "../components/yoonmade/SearchFriend";

const Friends = () => {
  const [back, setBack] = useState(true);
  const [showFriend, setShowFriend] = useState(false);
  const [showSearch, setShowSerach] = useState(false);
  const [isEditProfile, setIsEditProfile] = useState(false);

  const { isLoading: infoLoading, data: infoData } = useQuery(["myInfo"], getMyInfo);
  const { isLoading: groupLoading, data: friendGroup } = useQuery(["friendGroup"], getFriendGroup);
  const { isLoading: friendLoading, data: friendList } = useQuery(["friendList"], getMyFriends);

  const showSearchCom = () => {
    setShowSerach(prev => !prev);
    setShowFriend(false);
  };

  const showFriendCom = () => {
    setShowFriend(prev => !prev);
    setShowSerach(false);
  };

  const goBack = () => {
    setBack(true);
    setShowFriend(false);
    setShowSerach(false);
  };

  return (
    <>
      {(infoLoading || groupLoading || friendLoading) ? (
        <Loading />
      ) : (
        <>
          <NavBar infoData={infoData} setIsEditProfile={setIsEditProfile} />
          <Portal>
            {isEditProfile && 
              <EditMyProfile
                info={infoData.data}
                setIsEditProfile={setIsEditProfile}
              />
            }
          </Portal>
          <Wrap>
            <AnimatePresence custom={{ back }}>
              <GroupContainer>
                <GroupList
                  showFriend={showFriend}
                  showSearch={showSearch}
                  showSearchCom={showSearchCom}
                  showFriendCom={showFriendCom}
                  friendGroup={friendGroup.data}
                />
              </GroupContainer>

              {/* 아래 두개 그룹리스트로 들어가야함. */}
              {showFriend && 
                <FriendContainer
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 0 }}
                  key="2"
                >
                  <FriendList goBack={goBack} friendList={friendList}/>
                </FriendContainer>
              }
              {showSearch && 
                <SerachContainer
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 0 }}
                  key="2"
                >
                  <SearchFriend goBack={goBack} />
                </SerachContainer>
              }
              {/* 위에 두개 그룹리스트로 들어가야함*/}
            </AnimatePresence>
          </Wrap>
        </>
      )}
    </>
  );
};

export default Friends;

const Wrap = styled(motion.div)`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3%;

  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
  Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

  @media all and (min-width: 1024px) {
    font-size: 15px;
  }
  @media all and (min-width: 2000px) {
    font-size: 20px;
  }

  * {
    box-sizing: border-box;
  }
`;

const GroupContainer = styled(motion.div)`
  height: 70%;
  width: 60%;
  display: flex;
  flex-direction: column;
`;

const SerachContainer = styled(motion.div)`
  height: 10%;
  width: 13%;
  position: absolute;
  top:22%;
  right:37%;
  z-index: ${(prop) => (prop.ismodal ? "-1" : 0)};
`;

const FriendContainer = styled(motion.div)`
  height: 10%;
  width: 13%;
  position: absolute;
  top:22%;
  right:41.5%;
  z-index: ${(prop) => (prop.ismodal ? "-1" : 0)};
`;
