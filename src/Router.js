import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ChatPage from "./components/yoonmade/ChatPage";
import KakaoRedirectHandler from "./components/yoonmade/KakaoRedirectHandler";
import ChatRoom from "./pages/ChatRoom";
import Friends from "./pages/Friends";
import LogIn from "./pages/LogIn";
import Main from "./pages/Main";
import SignUp from "./pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <LogIn/>
      },
      {
        path: "signUp",
        element: <SignUp />
      },
      {
        path: "main",
        element: <Main />,
        errorElement: <LogIn />
      },
      {
        path: "myFriends",
        element: <Friends />,
        errorElement: <LogIn />
      },
      {
        path: "chatroom",
        element: <ChatRoom />,
        errorElement: <LogIn />
      },
      {
        path: "kakao",
        element: <KakaoRedirectHandler />
      },
      {
        // 연습페이지
        path:"chatP/:groupId",
        element: <ChatPage />
      }
    ]
  }
]);

export default router;

// 이파일은 수정 ㄴㄴ 해주세요!