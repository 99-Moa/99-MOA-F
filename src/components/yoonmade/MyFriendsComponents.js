import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getFriendGroup, getFriendList } from "../../api/memberManage";
import Loading from "../parkmade/common/loading/Loading";
import FriendList from "./FriendList";
import GroupList from "./GroupList";
import SearchFriend from "./SearchFriend";

// 디자인 대기중

const box = {
  invisible: ({ back: isBack, firstRender }) => {
    if (firstRender) {
      return {
        x: 0,
        opacity: 1,
        scale: 1,
      };
    } else return { x: isBack ? -1000 : 1000, opacity: 0, scale: 1 };
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
    x: isBack ? 1000 : -1000,
    opacity: 0,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  }),
};

const MyFriendsConponents = () => {
  // 슬라이드모션, 애니메이션 관련 state
  const [back, setBack] = useState(true);
  const [firstRender, setFirstRender] = useState(true);
  const [showFriend, setShowFriend] = useState(false);
  const [showSearch, setShowSerach] = useState(false);

  // 리액트 쿼리
  const { isLoading: groupLoading, data: friendGroup } = useQuery(
    ["friendGroup"],
    getFriendGroup
  );
  const { isLoading: friendLoading, data: friendList } = useQuery(
    ["friendList"],
    getFriendList
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
      {groupLoading && friendLoading ? (
        <Loading />
      ) : (
        <Layout>
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
        </Layout>
      )}
    </>
  );
};

export default MyFriendsConponents;

const Layout = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
