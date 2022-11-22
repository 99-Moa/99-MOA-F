import { useState } from "react";
import styled, { css } from "styled-components";

const ChatPage = () => {
  const [userBoxView, setUserBoxView] = useState(false);
  const [planBoxView, setPlanBoxView] = useState(false);
  return (
    <Layout>
      <Container>
        <ChatBox userBoxView={userBoxView} planBoxView={planBoxView}>
          <ChatBoxHeader>
            <ChatTitle>일정 제목</ChatTitle>
            <ChatIconWrapper>
              <Svg
                onClick={() => setUserBoxView((prev) => !prev)}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path fill="none" d="M0 0h24v24H0V0z" />
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4z" />
              </Svg>
              <Svg
                onClick={() => setPlanBoxView((prev) => !prev)}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <line
                  x1="3"
                  y1="12"
                  x2="21"
                  y2="12"
                  stroke-width="2"
                  stroke-linecap="round"
                ></line>
                <line
                  x1="3"
                  y1="6"
                  x2="21"
                  y2="6"
                  stroke-width="2"
                  stroke-linecap="round"
                ></line>
                <line
                  x1="3"
                  y1="18"
                  x2="21"
                  y2="18"
                  stroke-width="2"
                  stroke-linecap="round"
                ></line>
              </Svg>
            </ChatIconWrapper>
          </ChatBoxHeader>
          <ChatBoxBody>
            <ChattingArea>
              <ChattingBox>
                <ChattingUserImgWrapper>
                  <img src="http://www.urbanbrush.net/web/wp-content/uploads/edd/2020/02/urbanbrush-20200227023608426223.jpg" />
                </ChattingUserImgWrapper>
                <ChattingMainWrapper>
                  <span>윤상민</span>
                  <div>
                    ㅇㄴㄹㄹㅇㄴㅇㄹㅇㄴㄹㄴㅇㄹㅇㄴㄹㄹㅇㄴㅇㄹㄴㅇㄹㅇㄴㅇㄹ
                  </div>
                </ChattingMainWrapper>
                <ChattingTimeWrapper>
                  <span>오후3:12</span>
                </ChattingTimeWrapper>
              </ChattingBox>
              <MyChattingBox>
                <ChattingMainWrapper>
                  <div>
                    ㅇㄴㄹㄹㅇㄴㅇㄹㅇㄴㄹㄴㅇㄹㅇㄴㄹㄹㅇㄴㅇㄹㄴㅇㄹㅇㄴㄹㄹㅇㄴㅇㄹㅇㄴㄹㄴㅇㄹㅇㄴㄹㄹㅇㄴㅇㄹㄴㅇㄹ
                  </div>
                </ChattingMainWrapper>
                <ChattingTimeWrapper>
                  <span>오후3:12</span>
                </ChattingTimeWrapper>
              </MyChattingBox>
            </ChattingArea>
            <ChatInput />
          </ChatBoxBody>
        </ChatBox>
        <UserBox view={userBoxView}></UserBox>
        <PlanBox view={planBoxView}></PlanBox>
      </Container>
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
  height: 70%;
  width: 70%;
  border: 1px solid gray;
  border-radius: 5px;
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

const ChatBoxHeader = styled.div`
  height: 9%;
  padding: 1%;
  border-bottom: 1px solid gray;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChatTitle = styled.span`
  font-size: 1em;
`;

const ChatIconWrapper = styled.div`
  width: fit-content;
  display: flex;
  gap: 0.5em;
`;

const Svg = styled.svg`
  height: 1.5em;
  width: 1.5em;
  cursor: pointer;
`;

const ChatBoxBody = styled.div`
  height: 91%;
  padding: 2%;
`;

const ChattingArea = styled.div`
  height: 93%;
`;

const ChattingBox = styled.div`
  height: fit-content;
  display: flex;
`;

const ChattingUserImgWrapper = styled.div`
  width: fit-content;
  height: fit-content;

  img {
    height: 3em;
    width: 3em;
    border-radius: 50%;
  }
`;

const MyChattingBox = styled.div`
  margin-top: 2%;
  display: flex;
  flex-direction: row-reverse;
`;

const ChattingMainWrapper = styled.div`
  max-width: 60%;
  margin-left: 1%;
  margin-top: 5px;

  div {
    padding: 0.5em;
    border: 1px solid;
    border-radius: 4px;
    font-size: 0.9em;
  }
`;

const ChattingTimeWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;

  span {
    white-space: nowrap;
    font-size: 0.8em;
  }
`;

const ChatInput = styled.textarea`
  height: 7%;
  width: 100%;
  border: 1px solid gray;
  resize: none;
`;

const UserBox = styled.div`
  height: 100%;
  width: 0%;
  border-left: 1px solid rgba(160, 160, 160, 0);

  transition: 0.5s ease-in-out;

  ${(props) =>
    props.view &&
    css`
      width: 15%;
      border-left: 1px solid rgba(160, 160, 160, 1);
    `}
`;

const PlanBox = styled.div`
  height: 100%;
  width: 0%;
  border-left: 1px solid rgba(160, 160, 160, 0);

  transition: 0.5s ease-in-out;

  ${(props) =>
    props.view &&
    css`
      width: 30%;
      border-left: 1px solid rgba(160, 160, 160, 1);
    `}
`;
