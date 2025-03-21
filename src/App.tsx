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

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // General posts state
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [pagePosts, setPagePosts] = useState(1);

  // User-specific posts state
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [isLoadingUserPosts, setIsLoadingUserPosts] = useState(true);
  const [hasMoreUserPosts, setHasMoreUserPosts] = useState(true);
  const [pageUserPosts, setPageUserPosts] = useState(1);
  const [userToFilterBy, setUserToFilterBy] = useState<User | undefined>(
    undefined
  );

  // Fetch general posts
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

  // Fetch user-specific posts
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

  // Handle user filter change
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

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    fetchPosts(pagePosts);
  }, []);

  // useEffect(() => {
  //   if (userToFilterBy) {
  //     fetchUserPosts(pageUserPosts, userToFilterBy._id);
  //   }
  // }, [userToFilterBy]);

  useEffect(() => {
    console.log("Posts updated:", posts);
  }, [posts]);

  useEffect(() => {
    console.log("User Posts updated:", userPosts);
  }, [userPosts]);

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
        />
      </Router>
    </ThemeProvider>
  );
};

const AppContent: React.FC<{
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
}> = ({
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
}) => {
  const locationRoute = useLocation();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {locationRoute.pathname !== ENDPOINTS.LOGIN &&
        locationRoute.pathname !== ENDPOINTS.REGISTER && (
          <div style={{ height: "5vh", flexShrink: 0 }}>
            <Navbar
              toggleTheme={toggleTheme}
              isDarkMode={isDarkMode}
              setUserToFilterBy={setUserToFilterByFunc}
            />
          </div>
        )}
      <div style={{ height: "10vh" }} />
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
        />
      </div>
    </div>
  );
};

const MainContent: React.FC<{
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
}> = ({
  userToFilterBy,
  setUserToFilterByFunc,
  posts,
  hasMorePosts,
  fetchPosts,
  userPosts,
  hasMoreUserPosts,
  fetchUserPosts,
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
              />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
