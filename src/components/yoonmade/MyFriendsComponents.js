import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";

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
  const [showFreind, setShowFriend] = useState(false);
  const [showSearch, setShowSerach] = useState(false);

  // 친구그룹창 state

  // 친구검색창 state
  const [userName, setUserName] = useState("");
  const [userInfo, setUserInfo] = useState({
    friendUsername: "닉네임",
    imgUrl:
      "https://img.insight.co.kr/static/2020/03/16/700/txyrzifi14lg6auqmo10.jpg",
  });

  // 친구리스트 state
  const [friendName, setFriendName] = useState("");
  const [friendList, setFriendList] = useState([
    {
      id: 1,
      friendUsername: "윤상민",
      imgUrl:
        "https://img.insight.co.kr/static/2020/03/16/700/txyrzifi14lg6auqmo10.jpg",
    },
    {
      id: 2,
      friendUsername: "윤상",
      imgUrl:
        "https://img.insight.co.kr/static/2020/03/16/700/txyrzifi14lg6auqmo10.jpg",
    },
    {
      id: 2,
      friendUsername: "닉네임2",
      imgUrl:
        "https://img.insight.co.kr/static/2020/03/16/700/txyrzifi14lg6auqmo10.jpg",
    },
    {
      id: 2,
      friendUsername: "닉네임2",
      imgUrl:
        "https://img.insight.co.kr/static/2020/03/16/700/txyrzifi14lg6auqmo10.jpg",
    },
    {
      id: 2,
      friendUsername: "닉네임",
      imgUrl:
        "https://img.insight.co.kr/static/2020/03/16/700/txyrzifi14lg6auqmo10.jpg",
    },
    {
      id: 2,
      friendUsername: "닉네임3",
      imgUrl:
        "https://img.insight.co.kr/static/2020/03/16/700/txyrzifi14lg6auqmo10.jpg",
    },
    {
      id: 2,
      friendUsername: "테스트",
      imgUrl:
        "https://img.insight.co.kr/static/2020/03/16/700/txyrzifi14lg6auqmo10.jpg",
    },
    {
      id: 2,
      friendUsername: "테스트이",
      imgUrl:
        "https://img.insight.co.kr/static/2020/03/16/700/txyrzifi14lg6auqmo10.jpg",
    },
    {
      id: 2,
      friendUsername: "닉네",
      imgUrl:
        "https://img.insight.co.kr/static/2020/03/16/700/txyrzifi14lg6auqmo10.jpg",
    },
    {
      id: 2,
      friendUsername: "닉네임2",
      imgUrl:
        "https://img.insight.co.kr/static/2020/03/16/700/txyrzifi14lg6auqmo10.jpg",
    },
    {
      id: 2,
      friendUsername: "닉네임2",
      imgUrl:
        "https://img.insight.co.kr/static/2020/03/16/700/txyrzifi14lg6auqmo10.jpg",
    },
    {
      id: 2,
      friendUsername: "닉네임2",
      imgUrl:
        "https://img.insight.co.kr/static/2020/03/16/700/txyrzifi14lg6auqmo10.jpg",
    },
  ]);
  const [filterFriendList, setFilterFriendList] = useState([]);

  // 친구그룹창 api, data, 함수
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

  // const { data } = useQuery();  group리스트 get 요청

  // 친구검색창 api, data, 함수
  const onChangeSerachInput = (e) => {
    const value = e.target.value;
    setUserName(value);
  };

  const onSerachFriend = () => {
    // userName을 받아 친구를 검색하는 함수
    // setUserInfo()
  };

  const onAddFriend = () => {
    // 현재 보여지고 있는 친구를 친구추가
    // 친구추가 성공시 그룹화면으로 이동
  };

  // 친구리스트 api, data, 함수
  const onChangeFriendInput = (e) => {
    const value = e.target.value;

    const filterList = friendList.filter(({ friendUsername }) => {
      return friendUsername.includes(value);
    });

    setFilterFriendList(filterList);
    setFriendName(value);
  };

  useEffect(() => {
    console.log(filterFriendList, friendName);
  }, [filterFriendList, friendName]);

  return (
    <Layout>
      <AnimatePresence custom={{ back }}>
        {!showFreind && !showSearch && (
          <GroupContainer
            custom={{ back, firstRender }}
            variants={box}
            initial="invisible"
            animate="visible"
            exit="exit"
            key="1"
          >
            <GroupHeader>
              <Button>친구그룹</Button>
              <Button onClick={showFriendCom}>내친구</Button>
              <Button onClick={showSearchCom}>검색하기</Button>
            </GroupHeader>
            <GroupBody>
              <SearchInput />
              <GroupItemBox>
                <GroupItemWrapper></GroupItemWrapper>
                <GroupItemWrapper></GroupItemWrapper>
                <GroupItemWrapper></GroupItemWrapper>
                <GroupItemWrapper></GroupItemWrapper>
                <GroupItemWrapper></GroupItemWrapper>
                <GroupItemWrapper></GroupItemWrapper>
              </GroupItemBox>
            </GroupBody>
          </GroupContainer>
        )}
        {showFreind && (
          <FriendContainer
            custom={{ back }}
            variants={box}
            initial="invisible"
            animate="visible"
            exit="exit"
            key="2"
          >
            <FirendListHeader>
              <button onClick={goBack}>뒤로</button>
              <FrinedListTitle>내 친구</FrinedListTitle>
            </FirendListHeader>
            <FriendInputWrapper>
              <FriendInput value={friendName} onChange={onChangeFriendInput} />
            </FriendInputWrapper>
            <FriendListBox>
              {filterFriendList.length >= 1 || friendName
                ? filterFriendList.map((friendInfo) => (
                    <FriendWrapper>
                      <FriendImg src={friendInfo.imgUrl} />
                      <FriendName>{friendInfo.friendUsername}</FriendName>
                      <DeleteBtn>
                        <span>삭제</span>
                      </DeleteBtn>
                    </FriendWrapper>
                  ))
                : friendList.map((friendInfo) => (
                    <FriendWrapper>
                      <FriendImg src={friendInfo.imgUrl} />
                      <FriendName>{friendInfo.friendUsername}</FriendName>
                      <DeleteBtn>
                        <span>삭제</span>
                      </DeleteBtn>
                    </FriendWrapper>
                  ))}
            </FriendListBox>
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
            <FriendSearchHeader>
              <button onClick={goBack}>뒤로</button>
              <h1>친구 검색</h1>
            </FriendSearchHeader>
            <FriendSearchBody>
              <SearchInputWrapper>
                <FriendSearchInput
                  onChange={onChangeSerachInput}
                  value={userName}
                />
                <SearchBtn>검색하기</SearchBtn>
              </SearchInputWrapper>
              <SearchRstProfileWrapper>
                <SearchRstImg src={userInfo.imgUrl} />
                <SerachRstNickName>{userInfo.friendUsername}</SerachRstNickName>
                <SearchRstBtn>친구추가</SearchRstBtn>
              </SearchRstProfileWrapper>
            </FriendSearchBody>
          </SerachContainer>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default MyFriendsConponents;

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  * {
    box-sizing: border-box;
  }
`;

const GroupContainer = styled(motion.div)`
  height: 70vh;
  width: 30%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const GroupHeader = styled.div`
  display: flex;
  gap: 20px;
  font-size: 25px;
`;

const Button = styled.div`
  cursor: pointer;
`;

const GroupBody = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 20px;
  padding: 15px;
`;

const GroupItemBox = styled.div`
  display: grid;
  margin: 0 auto;
  width: 80%;
  height: 95%;
  gap: 20px;
  grid-template-columns: repeat(2, 1fr);
`;

const GroupItemWrapper = styled.div`
  background-color: teal;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 5%;
`;

const SerachContainer = styled(motion.div)`
  /* height: 50vh; */
  width: 30%;
  border: 1px solid black;
  margin: 0 auto;
  padding: 20px;
  position: absolute;
`;

const FriendSearchHeader = styled.div`
  width: 100%;
  display: flex;
  height: 50px;
  border: 1px solid black;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 20px;
    position: absolute;
  }

  button {
    margin-right: auto;
  }
`;

const FriendSearchBody = styled.div`
  height: 50vh;
  border: 1px solid black;
  margin-top: 20px;
  overflow: auto;
  padding: 5px;
`;

const SearchInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 20px;
`;

const FriendSearchInput = styled.input`
  width: 80%;
  padding: 2%;
  font-size: 20px;
  text-align: center;
`;

const SearchBtn = styled.div`
  border: 1px solid black;
  display: flex;
  align-items: center;
`;

const SearchRstProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20%;
`;

const SearchRstImg = styled.img`
  height: 30%;
  width: 30%;
  border-radius: 50%;
`;

const SerachRstNickName = styled.h3``;

const SearchRstBtn = styled.div`
  border: 1px solid black;
  padding: 2%;
`;

const FriendContainer = styled(motion.div)`
  height: 70vh;
  width: 30%;
  border: 1px solid black;
  margin: 0 auto;
  position: absolute;
  padding: 20px;
`;

const FriendInputWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const FriendInput = styled.input`
  margin: 20px 0px;
  width: 80%;
  text-align: center;
  padding: 2%;
`;

const FirendListHeader = styled.div`
  width: 100%;
  display: flex;
  height: 50px;
  border: 1px solid black;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 20px;
    position: absolute;
  }

  button {
    margin-right: auto;
  }
`;

const FrinedListTitle = styled.h1``;

const FriendListBox = styled.div`
  width: 80%;
  height: calc(95% - 100px);
  padding: 20px;
  border: 1px solid black;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow: auto;
`;

const FriendWrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FriendImg = styled.img`
  height: 100%;
  width: 10%;
  border-radius: 50%;
`;

const FriendName = styled.div``;

const DeleteBtn = styled.div`
  width: 10%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
