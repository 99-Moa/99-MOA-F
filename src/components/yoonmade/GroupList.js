import InputComponent from "./InputComponent";
import styled from "styled-components";
import GroupInfo from "./GroupInfo";
import { defaultColor } from "./styles";
import emoji from "../../img/Sunglasses_emoji.png";

const GroupList = ({ showFriendCom, showSearchCom, friendGroup }) => {
  const test = 
  [{
    groupId: 1,
    groupName: "11월 나들이 오두방정 모임",
    userNum: 3,
    userImg: [
    "http://www.urbanbrush.net/web/wp-content/uploads/edd/2020/02/urbanbrush-20200227023608426223.jpg",
    "https://helpx.adobe.com/content/dam/help/en/photoshop/using/quick-actions/remove-background-before-qa1.png",
    "https://demo.ycart.kr/shopboth_farm_max5_001/data/editor/1612/cd2f39a0598c81712450b871c218164f_1482469221_493.jpg",
    ],
    date: "2022년 11월 10일",
    time: "오후 7시",
    location: "서울역, 서울특별시 용산구 한강대로 405",
    },
    {
    groupId: 1,
    groupName: "11월 나들이 오두방정 모임",
    userNum: 5,
    userImg: [
    "http://www.urbanbrush.net/web/wp-content/uploads/edd/2020/02/urbanbrush-20200227023608426223.jpg",
    "https://helpx.adobe.com/content/dam/help/en/photoshop/using/quick-actions/remove-background-before-qa1.png",
    "https://demo.ycart.kr/shopboth_farm_max5_001/data/editor/1612/cd2f39a0598c81712450b871c218164f_1482469221_493.jpg",
    "https://img.seoul.co.kr/img/upload/2022/10/06/SSI_20221006144927_O2.jpg",
    "https://img.seoul.co.kr/img/upload/2022/10/06/SSI_20221006144927_O2.jpg",
    ],
    date: "2022년 11월 10일",
    time: "오후 7시",
    location: "서울역, 서울특별시 용산구 한강대로 405",
    },
    {
    groupId: 1,
    groupName: "11월 나들이 오두방정 모임",
    userNum: 4,
    userImg: [
    "http://www.urbanbrush.net/web/wp-content/uploads/edd/2020/02/urbanbrush-20200227023608426223.jpg",
    "https://helpx.adobe.com/content/dam/help/en/photoshop/using/quick-actions/remove-background-before-qa1.png",
    "https://demo.ycart.kr/shopboth_farm_max5_001/data/editor/1612/cd2f39a0598c81712450b871c218164f_1482469221_493.jpg",
    "https://helpx.adobe.com/content/dam/help/en/photoshop/using/quick-actions/remove-background-before-qa1.png",
    ],
    date: "2022년 11월 10일",
    time: "오후 7시",
    location: "서울역, 서울특별시 용산구 한강대로 405",
    },
    {
    groupId: 1,
    groupName: "11월 나들이 오두방정 모임",
    userNum: 6,
    userImg: [
    "http://www.urbanbrush.net/web/wp-content/uploads/edd/2020/02/urbanbrush-20200227023608426223.jpg",
    "https://helpx.adobe.com/content/dam/help/en/photoshop/using/quick-actions/remove-background-before-qa1.png",
    "https://demo.ycart.kr/shopboth_farm_max5_001/data/editor/1612/cd2f39a0598c81712450b871c218164f_1482469221_493.jpg",
    "http://www.urbanbrush.net/web/wp-content/uploads/edd/2020/02/urbanbrush-20200227023608426223.jpg",
    "https://helpx.adobe.com/content/dam/help/en/photoshop/using/quick-actions/remove-background-before-qa1.png",
    "https://demo.ycart.kr/shopboth_farm_max5_001/data/editor/1612/cd2f39a0598c81712450b871c218164f_1482469221_493.jpg",
    ],
    date: "2022년 11월 10일",
    time: "오후 7시",
    location: "서울역, 서울특별시 용산구 한강대로 405",
    }]

  return (
    <>
      <Header>
        <Button onClick={showFriendCom}>친구목록</Button>
        <Button onClick={showSearchCom}>친구추가</Button>
        <InputComponent placeholder="그룹 검색" />
      </Header>
      {!friendGroup?.length ? (
        <NotGropuWrapper>
          <img src={emoji} alt="emoji" />
          <span>새로운 그룹을 등록해주세요.</span>
        </NotGropuWrapper>
      ) : (
        <Body>
          {friendGroup.map((group) => (
            <GroupInfo group={group} key={group.groupId} />
          ))}
        </Body>
      )}
    </>
  );
};

export default GroupList;

const Header = styled.div`
  height: 5%;
  width: 100%;
  margin-bottom: 1em;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.8em;
`;

const Button = styled.div`
  height: 100%;
  border: 1px solid ${defaultColor.darkGrey};
  padding: 0 0.6em;
  border-radius: 0.4em;
  display: flex;
  align-items: center;
  font-size: 0.8em;
  cursor: pointer;
`;

const Body = styled.div`
  height: 95%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, auto));
  grid-auto-rows: 180px;
  gap: 1em;
  overflow: auto;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const NotGropuWrapper = styled.div`
  height: 100%;
  border: 1px solid ${defaultColor.lightGrey};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.2em;

  img {
    height: 2em;
    width: 2em;
    opacity: 0.4;
  }
  span {
    font-size: 1.3em;
    font-weight: 400;
    color: ${defaultColor.darkGrey};
  }
`;
