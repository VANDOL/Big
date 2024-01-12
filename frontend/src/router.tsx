import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import MyMap  from "./routes/MyMap1";
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