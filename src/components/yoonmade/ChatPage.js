// import { Client } from "@stomp/stompjs";
// import { useEffect, useRef, useState } from "react";
// import { useLocation, useParams } from "react-router-dom";
// import SockJS from "sockjs-client";
// import styled, { css } from "styled-components";
// import { defaultColor } from "./styles";

// import ChatSection from "./ChatSection";
// import OnlineCheckSection from "./OnlineCheckSection";
// import { useQuery } from "react-query";
// import { getGroupDetail } from "../../api/memberManage";
// import PlanSection from "./PlanSection";

// // eslint-disable-next-line no-extend-native
// Date.prototype.amPm = function () {
//   let h;
//   const hour = this.getHours();
//   const min = this.getMinutes();
//   if (this.getHours() < 12) {
//     h = `오전${hour}:${min}`;
//   } else {
//     h = `오후${hour - 12}:${min}`;
//   }

//   return h;
// };

// const ChatPage = () => {
//   const MY_TOKEN = localStorage.getItem("access_token");

//   const location = useLocation();
//   const { groupId } = useParams();
//   const { chatRoomId } = location.state;

//   const [userBoxView, setUserBoxView] = useState(false);
//   const [planBoxView, setPlanBoxView] = useState(false);
//   return (
//     <Layout>
//       <Container>
//         <ChatBox userBoxView={userBoxView} planBoxView={planBoxView}>
//           <ChatSection
//             data={detailData?.data}
//             setUserBoxView={setUserBoxView}
//             userBoxView={userBoxView}
//             setPlanBoxView={setPlanBoxView}
//             planBoxView={planBoxView}
//             allMessage={allMessage}
//             stompSendFn={stompSendFn}
//             chatRoomId={chatRoomId}
//             MY_TOKEN={MY_TOKEN}
//           />
//         </ChatBox>
//         <UserBox view={userBoxView}>
//           {userBoxView && (
//             <OnlineCheckSection
//               onlineUser={onlineUser}
//               userInfoList={detailData?.data?.userInfoList}
//             />
//           )}
//         </UserBox>
//         <PlanBox view={planBoxView}>
//           <PlanSection data={detailData?.data} planBoxView={planBoxView} />
//         </PlanBox>
//       </Container>
//     </Layout>
//   );
// };

// export default ChatPage;

// const Layout = styled.div`
//   height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   @media all and (min-width: 1024px) {
//     font-size: 15px;
//   }
//   @media all and (min-width: 2000px) {
//     font-size: 20px;
//   }

//   * {
//     box-sizing: border-box;
//   }
// `;

// const Container = styled.div`
//   height: 80%;
//   width: 100%;
//   border: 1px solid ${defaultColor.lightGrey};
//   display: flex;
// `;

// const ChatBox = styled.div`
//   height: 100%;
//   width: 100%;

//   transition: 0.5s ease-in-out;
//   ${({ planBoxView, userBoxView }) => {
//     if (planBoxView && userBoxView) {
//       return css`
//         width: 55%;
//       `;
//     }
//     if (planBoxView) {
//       return css`
//         width: 55%;
//         opacity: 1;
//       `;
//     }
//     if (userBoxView) {
//       return css`
//         width: 85%;
//       `;
//     }
//   }}
// `;

// const UserBox = styled.div`
//   height: 100%;
//   width: 0%;
//   display: flex;
//   flex-direction: column;
//   border-left: 1px solid ${defaultColor.lightGrey};

//   transition: 0.5s ease-in-out;

//   ${(props) =>
//     props.view &&
//     css`
//       width: 15%;
//       border-left: 1px solid ${defaultColor.lightGrey};
//     `}
// `;

// const PlanBox = styled.div`
//   height: 100%;
//   width: 0%;
//   border-left: 1px solid rgba(160, 160, 160, 0);

//   transition: 0.5s ease-in-out;

//   font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
//     Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

//   ${(props) =>
//     props.view &&
//     css`
//       width: 30%;
//       border-left: 1px solid rgba(160, 160, 160, 1);
//     `}
// `;
