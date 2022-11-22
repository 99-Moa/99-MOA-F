import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getFriendGroup, getMyFriends, getMyInfo } from "../api/memberManage";
import Loading from "../components/parkmade/common/loading/Loading";
import Portal from "../components/parkmade/common/modal/Portal";
import EditMyProfile from "../components/parkmade/common/navigationBar/EditMyProfile";
import NavBar from "../components/parkmade/common/navigationBar/NavBar";
import FriendList from "../components/yoonmade/FriendList";
import GroupList from "../components/yoonmade/GroupList";
import SearchFriend from "../components/yoonmade/SearchFriend";

const box = {
  invisible: ({ back: isBack, firstRender }) => {
    if (firstRender) {
      return {
        x: 0,
        opacity: 1,
        scale: 1,
      };
    } else return { x: isBack ? -500 : 500, opacity: 0, scale: 1 };
  },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: ({ back: isBack }) => ({
    x: isBack ? 500 : -500,
    opacity: 0,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  }),
};

const Friends = () => {
  const [back, setBack] = useState(true);
  const [firstRender, setFirstRender] = useState(true);
  const [showFriend, setShowFriend] = useState(false);
  const [showSearch, setShowSerach] = useState(false);
  const [isEditProfile, setIsEditProfile] = useState(false);

  const { isLoading: infoLoading, data: infoData } = useQuery(
    ["myInfo"],
    getMyInfo
  );
  const { isLoading: groupLoading, data: friendGroup } = useQuery(
    ["friendGroup"],
    getFriendGroup
  );
  const { isLoading: friendLoading, data: friendList } = useQuery(
    ["friendList"],
    getMyFriends
  );

  const showSearchCom = () => {
    setBack(false);
    setFirstRender(false);
    setShowSerach(true);
  };

  const showFriendCom = () => {
    setBack(false);
    setFirstRender(false);
    setShowFriend(true);
  };

  const goBack = () => {
    setBack(true);
    setShowFriend(false);
    setShowSerach(false);
  };
  return (
    <>
      {infoLoading || groupLoading || friendLoading ? (
        <Loading />
      ) : (
        <>
          <NavBar infoData={infoData} setIsEditProfile={setIsEditProfile} />
          <Portal>
            {isEditProfile && (
              <EditMyProfile
                info={infoData.data}
                setIsEditProfile={setIsEditProfile}
              />
            )}
          </Portal>
          <Wrap>
            <AnimatePresence custom={{ back }}>
              {!showFriend && !showSearch && (
                <GroupContainer
                  custom={{ back, firstRender }}
                  variants={box}
                  initial="invisible"
                  animate="visible"
                  exit="exit"
                  key="1"
                >
                  <GroupList
                    showSearchCom={showSearchCom}
                    showFriendCom={showFriendCom}
                    friendGroup={friendGroup}
                  />
                </GroupContainer>
              )}
              {showFriend && (
                <FriendContainer
                  custom={{ back }}
                  variants={box}
                  initial="invisible"
                  animate="visible"
                  exit="exit"
                  key="2"
                >
                  <FriendList goBack={goBack} friendList={friendList} />
                </FriendContainer>
              )}
              {showSearch && (
                <SerachContainer
                  custom={{ back }}
                  variants={box}
                  initial="invisible"
                  animate="visible"
                  exit="exit"
                  key="2"
                >
                  <SearchFriend goBack={goBack} />
                </SerachContainer>
              )}
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

  * {
    box-sizing: border-box;
  }
`;

const GroupContainer = styled(motion.div)`
  height: 70vh;
  width: 30%;
  display: flex;
  flex-direction: column;
`;

const SerachContainer = styled(motion.div)`
  width: 30%;
  padding: 20px;
  border: 1px solid;
  position: absolute;
`;

const FriendContainer = styled(motion.div)`
  height: 70vh;
  width: 30%;
  padding: 20px;
  border: 1px solid;
  position: absolute;
`;
