import "./global.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./ProtectedRoute";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./theme";
import Navbar from "./Navbar";
import UserPage from "./UserPage";
import { User } from "./types/User";
import { ENDPOINTS } from "./endpoints";
import postService, { CanceledError } from "./http-connections/postService";
import { Post } from "./types/Post";
import { getUserFromStorageId } from "./useActualUser";
import useUsers from "./data_hooks/useUsers";

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  const [posts, setPosts] = useState<Post[]>([]);
  const [, setIsLoadingPosts] = useState(true);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [pagePosts, setPagePosts] = useState(1);

  // User-specific
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [, setIsLoadingUserPosts] = useState(true);
  const [hasMoreUserPosts, setHasMoreUserPosts] = useState(true);
  const [pageUserPosts, setPageUserPosts] = useState(1);

  const [userToFilterBy, setUserToFilterBy] = useState<User | undefined>(
    undefined
  );

  const users = useUsers().users;

  const [actualUser, setActualUser] = useState<User | undefined>(
    getUserFromStorageId(users)
  );

  useEffect(() => {
    if (users.length > 0) {
      setActualUser(getUserFromStorageId(users));
    }
  }, [users.length > 0]);
  function setActualUserData(user: User | undefined) {
    localStorage.setItem("actualUser", user?._id || "");
    setActualUser(user);
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(isDarkMode));
    document.body.classList.toggle("dark-mode", isDarkMode);
    document.body.classList.toggle("light-mode", !isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    fetchPosts(pagePosts);
  }, []);

  const fetchPosts = (
    pageNumber: number,
    clearPreviousData: boolean = false
  ) => {
    setIsLoadingPosts(true);
    const { response, cancel } = postService.getWithPaging(pageNumber);
    response
      .then((res) => {
        setPosts((prev) => {
          const newPosts = res.data.posts;
          return clearPreviousData ? [...newPosts] : [...prev, ...newPosts];
        });
        setHasMorePosts(res.data.hasNextPage);
        setPagePosts((prevPage) => prevPage + 1);
        setIsLoadingPosts(false);
      })
      .catch((err) => {
        setIsLoadingPosts(false);
        if (err instanceof CanceledError) return;
        console.warn(err);
      });

    return () => cancel();
  };

  const fetchUserPosts = (
    pageNumber: number,
    userId: string,
    clearPreviousData: boolean = false
  ) => {
    setIsLoadingUserPosts(true);
    const { response, cancel } = postService.getWithPaging(pageNumber, userId);
    response
      .then((res) => {
        setUserPosts((prev) => {
          const newPosts = res.data.posts;
          return clearPreviousData ? [...newPosts] : [...prev, ...newPosts];
        });
        setHasMoreUserPosts(res.data.hasNextPage);
        setPageUserPosts((prevPage) => prevPage + 1);
        setIsLoadingUserPosts(false);
      })
      .catch((err) => {
        setIsLoadingUserPosts(false);
        if (err instanceof CanceledError) return;
        console.warn(err);
      });

    return () => cancel();
  };

  const setUserToFilterByFunc = (newUser: User | undefined) => {
    if (newUser !== undefined && newUser._id !== userToFilterBy?._id) {
      setUserToFilterBy(newUser);
      setPageUserPosts(1);
      setUserPosts([]);
      if (newUser._id) {
        fetchUserPosts(1, newUser._id, true);
      }
    } else if (newUser === undefined && userToFilterBy !== undefined) {
      setUserToFilterBy(undefined);
    }
  };

  const updatePostToArray = (
    updatedPost: Post,
    setPostsToEditComment: (value: React.SetStateAction<Post[]>) => void
  ) => {
    setPostsToEditComment((prevPosts) => {
      const index = prevPosts.findIndex((post) => post._id === updatedPost._id);
      if (index === -1) return prevPosts;
      const newPosts = [...prevPosts];
      newPosts[index] = updatedPost;
      return newPosts;
    });
  };

  const updatePost = (updatedPost: Post) => {
    updatePostToArray(updatedPost, setPosts);
    updatePostToArray(updatedPost, setUserPosts);
  };

  const deletePost = (id: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
    setUserPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
    setPagePosts((prev) => prev - 1);
    setPageUserPosts((prev) => prev - 1);
  };

  const addPost = (post: Post) => {
    setPosts((prevPosts) => [post, ...prevPosts]);
    if (userToFilterBy && userToFilterBy._id === post.owner) {
      setUserPosts((prevPosts) => [post, ...prevPosts]);
    }
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <AppContent
          toggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
          userToFilterBy={userToFilterBy}
          setUserToFilterByFunc={setUserToFilterByFunc}
          posts={posts}
          hasMorePosts={hasMorePosts}
          fetchPosts={() => fetchPosts(pagePosts)}
          userPosts={userPosts}
          hasMoreUserPosts={hasMoreUserPosts}
          fetchUserPosts={() =>
            userToFilterBy && fetchUserPosts(pageUserPosts, userToFilterBy._id)
          }
          updatePost={updatePost}
          deletePost={deletePost}
          addPost={addPost}
          actualUser={actualUser}
          setActualUser={setActualUserData}
        />
      </Router>
    </ThemeProvider>
  );
};

export type SharedProps = {
  updatePost: (post: Post) => void;
  deletePost: (id: string) => void;
  addPost: (post: Post) => void;
  actualUser: User | undefined;
  setActualUser: (user: User | undefined) => void;
};
const AppContent: React.FC<
  {
    toggleTheme: () => void;
    isDarkMode: boolean;
    setUserToFilterByFunc: (user: User | undefined) => void;
    userToFilterBy: User | undefined;
    posts: Post[];
    hasMorePosts: boolean;
    fetchPosts: () => void;
    userPosts: Post[];
    hasMoreUserPosts: boolean;
    fetchUserPosts: () => void;
  } & SharedProps
> = ({
  toggleTheme,
  isDarkMode,
  userToFilterBy,
  setUserToFilterByFunc,
  posts,
  hasMorePosts,
  fetchPosts,
  userPosts,
  hasMoreUserPosts,
  fetchUserPosts,
  ...sharedProps
}) => {
  const locationRoute = useLocation();

  const isAuthPage =
    locationRoute.pathname === ENDPOINTS.LOGIN ||
    locationRoute.pathname === ENDPOINTS.REGISTER;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {!isAuthPage && (
        <>
          <div style={{ height: "5vh", flexShrink: 0, marginBottom: "7vh" }}>
            <Navbar
              toggleTheme={toggleTheme}
              isDarkMode={isDarkMode}
              setUserToFilterBy={setUserToFilterByFunc}
              actualUser={sharedProps.actualUser}
              setActualUser={sharedProps.setActualUser}
            />
          </div>
        </>
      )}
      <div style={{ flex: 1, overflowY: "auto" }}>
        <MainContent
          toggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
          userToFilterBy={userToFilterBy}
          setUserToFilterByFunc={setUserToFilterByFunc}
          posts={posts}
          hasMorePosts={hasMorePosts}
          fetchPosts={fetchPosts}
          userPosts={userPosts}
          hasMoreUserPosts={hasMoreUserPosts}
          fetchUserPosts={fetchUserPosts}
          {...sharedProps}
        />
      </div>
    </div>
  );
};

const MainContent: React.FC<
  {
    toggleTheme: () => void;
    isDarkMode: boolean;
    setUserToFilterByFunc: (user: User | undefined) => void;
    userToFilterBy: User | undefined;
    posts: Post[];
    hasMorePosts: boolean;
    fetchPosts: () => void;
    userPosts: Post[];
    hasMoreUserPosts: boolean;
    fetchUserPosts: () => void;
  } & SharedProps
> = ({
  userToFilterBy,
  setUserToFilterByFunc,
  posts,
  hasMorePosts,
  fetchPosts,
  userPosts,
  hasMoreUserPosts,
  fetchUserPosts,
  actualUser,
  setActualUser,
  ...sharedProps
}) => {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <UserPage
                posts={posts}
                hasMorePosts={hasMorePosts}
                fetchPosts={fetchPosts}
                userPosts={userPosts}
                hasMoreUserPosts={hasMoreUserPosts}
                fetchUserPosts={fetchUserPosts}
                userToFilterBy={userToFilterBy}
                setUserToFilterBy={setUserToFilterByFunc}
                actualUser={actualUser}
                setActualUser={setActualUser}
                {...sharedProps}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={<Login setActualUser={setActualUser} />}
        />
        <Route
          path="/register"
          element={<Register setActualUser={setActualUser} />}
        />
      </Routes>
    </div>
  );
};

export default App;
