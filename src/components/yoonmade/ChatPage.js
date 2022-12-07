import { Client } from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import styled, { css } from "styled-components";
import { defaultColor } from "./styles";

import ChatSection from "./ChatSection";
import OnlineCheckSection from "./OnlineCheckSection";
import { useQuery } from "react-query";
import { getAllMessage, getGroupDetail, getMyInfo } from "../../api/memberManage";
import PlanSection from "./PlanSection";
import { axiosIns } from "../../api/api";

// eslint-disable-next-line no-extend-native
Date.prototype.amPm = function () {
  let h;
  const hour = this.getHours();
  const min = this.getMinutes();
  if (this.getHours() < 12) {
    h = `오전${hour}:${min}`;
  } else {
    h = `오후${hour - 12}:${min}`;
  }

  return h;
};

const ChatPage = () => {
  const MY_TOKEN = localStorage.getItem("access_token");

  const location = useLocation();
  const { groupId } = useParams();
  const { chatRoomId, infoData } = location.state;

  const [userBoxView, setUserBoxView] = useState(false);
  const [planBoxView, setPlanBoxView] = useState(true);
  const [allMessage, setAllmessage] = useState([]);
  const [onlineUser, setOnlineUser] = useState([]);

  // 리액트쿼리
  const {
    isLoading: detailLoading,
    data: detailData,
    refetch: detailRefetch,
  } = useQuery(["groupDetail"], () => getGroupDetail(groupId));

  const { isLoading: msgLoading } = useQuery(["allMsg"], () => getAllMessage(chatRoomId), {
    onSuccess: (data) => {
      setAllmessage(allDateFormat(data.data))
    }
  })


  // utils
  const stompSendFn = (des, body) => {
    client.current.publish({
      destination: des,
      headers: {},
      body: JSON.stringify(body),
    });
  };

  const allDateFormat = (prevAllMsg) => {
    return prevAllMsg.map((msg) => {
      const newDate = new Date(Date.parse(msg.time))
      return {
        sender:msg.sender, message:[msg.message], time: newDate.amPm()
      }
    })
  }

  // callbackHandler
  const messageCallbackHandler = (message) => {
    const msgData = JSON.parse(message.body);
    const date = new Date(Date.parse(msgData.time));
    const amPm = date.amPm();

    // 서버에서 받은 메세지 데이터를 배열로 담기위해 새로운 객체에 다시 담아준다.
    const newData = {
      message: [msgData.message],
      sender: msgData.sender,
      time: amPm,
    };


    setAllmessage((prev) => {
      if (
        // 내가보낸 메세지가 아니면서, 메세지가 1개이상, 직전의 메세지와 현재 메세지의 sender가 같을경우
        msgData.sender !== infoData.userName &&
        prev.length >= 1 &&
        msgData.sender === prev[prev.length - 1].sender &&
        amPm === prev[prev.length - 1].time
      ) {
        // 직전의 메세지 배열에 새로운 메세지를 push 해준다.
        prev[prev.length - 1].message.push(msgData.message);
        return [...prev];
      } else {
        return [...prev, newData];
      }
    });
  };

  const userCallbackHandler = (message) => {
    setOnlineUser(JSON.parse(message.body));
  };

  const planCallbackHandler = (message) => {
    console.log(JSON.parse(message.body));
    detailRefetch();
  };

  const onlineCheckHandelr = () => {
    detailRefetch();
  };

  // stomp
  const client = useRef(
    new Client({
      brokerURL: "ws://18.206.140.108/chatroom",
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    })
  );

  useEffect(() => {
    // axiosIns.get(`/message/${chatRoomId}`).then(success => {
    //   const msgData = success.data;
    //   setAllmessage(allDateFormat(msgData.data))
    // })
    client.current.activate();
    return () => {
      // 유저가 나갈때마다 실행
      stompSendFn("/app/user", {
        status: "LEAVE",
        token: MY_TOKEN,
        chatRoomId,
        message: "소켓연결종료",
      });
      // client.current.deactivate();
    };
  }, []);

  // 브라우저에서 웹소켓 지원 안할시 sockJS로 연결
  // client.current.webSocketFactory = () => {
  //   return new SockJS("http://18.206.140.108/chatroom");
  // };

  // 일정수정 더미데이터
  const plan = {
    chatRoomId,
    startDate: "2022-11-04",
    endDate: "2022-11-04",
    title: "제목입니다",
    startTime: "09:33",
    endTime: "13:00",
    location: "광주광역시",
    locationRoadName: "사암로",
    content: "야무지게 고기먹기",
  };

  //채팅 로직
  client.current.onConnect = () => {
    console.log("소켓 연결완료✅");

    // 채팅관련 구독
    client.current.subscribe(
      `/topic/${chatRoomId}/message`,
      messageCallbackHandler
    );
    // user상태관련 구독
    client.current.subscribe(`/topic/${chatRoomId}/user`, userCallbackHandler);
    // 일정관리관련 구독
    client.current.subscribe(`/topic/${chatRoomId}/plan`, planCallbackHandler);

    client.current.subscribe(
      `/topic/${chatRoomId}/onlineCheck`,
      onlineCheckHandelr
    );

    // 유저가 입장할때마다 실행(소켓연결)
    stompSendFn("/app/user", {
      status: "JOIN",
      token: MY_TOKEN,
      chatRoomId,
      message: "소켓연결됨",
    });
  };

  return (
    <Layout>
      {!detailLoading &&       
      <Container>
        <ChatBox userBoxView={userBoxView} planBoxView={planBoxView}>
          <ChatSection
            myProfile={infoData}
            data={detailData?.data}
            setUserBoxView={setUserBoxView}
            userBoxView={userBoxView}
            setPlanBoxView={setPlanBoxView}
            planBoxView={planBoxView}
            allMessage={allMessage}
            stompSendFn={stompSendFn}
            chatRoomId={chatRoomId}
            MY_TOKEN={MY_TOKEN}
          />
        </ChatBox>
        <UserBox view={userBoxView}>
          {userBoxView && (
            <OnlineCheckSection
              onlineUser={onlineUser}
              userInfoList={detailData?.data?.userInfoList}
            />
          )}
        </UserBox>
        <PlanBox view={planBoxView}>
          <PlanSection data={detailData?.data} planBoxView={planBoxView} />
        </PlanBox>
      </Container>}

    </Layout>
  );
};

export default ChatPage;

const Layout = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

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

const Container = styled.div`
  height: 80%;
  width: 100%;
  border: 1px solid ${defaultColor.lightGrey};
  display: flex;
`;

const ChatBox = styled.div`
  height: 100%;
  width: 100%;

  transition: 0.5s ease-in-out;
  ${({ planBoxView, userBoxView }) => {
    if (planBoxView && userBoxView) {
      return css`
        width: 55%;
      `;
    }
    if (planBoxView) {
      return css`
        width: 70%;
      `;
    }
    if (userBoxView) {
      return css`
        width: 85%;
      `;
    }
  }}
`;

const UserBox = styled.div`
  height: 100%;
  width: 0%;
  display: flex;
  flex-direction: column;
  border-left: 1px solid ${defaultColor.lightGrey};

  transition: 0.5s ease-in-out;

  ${(props) =>
    props.view &&
    css`
      width: 15%;
      border-left: 1px solid ${defaultColor.lightGrey};
    `}
`;

const PlanBox = styled.div`
  height: 100%;
  width: 0%;
  border-left: 1px solid ${defaultColor.lightGrey};

  transition: 0.5s ease-in-out;

  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

  ${(props) =>
    props.view &&
    css`
      width: 30%;
      border-left: 1px solid ${defaultColor.lightGrey};
    `}
`;
