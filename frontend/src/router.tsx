import { createBrowserRouter } from "react-router-dom";
import SubBoard from "./routes/SubBoard";
import Root from "./components/Root";
import GithubConfirm from "./routes/GithubConfirm";
import Home from "./routes/Home";
import KakaoConfirm from "./routes/KakaoConfirm";
import NotFound from "./routes/NotFound";
import RoomDetail from "./routes/RoomDetail";
import MyMap  from "./routes/MyMap1";
import UploadRoom from "./routes/UploadRoom";
import SignUpPage from "./routes/SignUp";
import BulletinBoard from "./routes/BulletinBoard";
import PostForm from "./components/PostForm";
import PostDetail from "./routes/PostDetail";
import Profile from "./routes/Profile";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
        children: [
          {
            path: "",
            element:<MyMap />,
          }
        ]
      },
      {
        path: "rooms/:roomPk",
        element: <RoomDetail />,
      },
      {
        path: "social",
        children: [
          {
            path: "github",
            element: <GithubConfirm />,
          },
          {
            path: "kakao",
            element: <KakaoConfirm />,
          },
        ],
      },
      {
        path: "/subboard",
        element: <SubBoard />,
      }, 
      {
        path: "rooms/upload",
        element: <UploadRoom />,
      },
      {
        path: "signup",
        element: <SignUpPage />
      },
      {
        path: "/new-board", // 게시판 페이지 경로
        element: <BulletinBoard />,
      },
      {
        path: "/create-post",
        element: <PostForm/>
      },
      {
        path: "/posts/:pk",
        element: <PostDetail/>
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

export default router;