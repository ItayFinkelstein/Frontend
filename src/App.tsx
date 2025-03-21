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
import usePosts from "./data_hooks/usePosts";
import postService, { CanceledError } from "./http-connections/postService";
import { Post } from "./types/Post";

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const fetchUserPosts = usePosts().loadNextUserPostsPage;

  const [isLoading, setIsLoading] = useState(true);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<Post[]>([]);

  const [userToFilterBy, setUserToFilterBy] = useState<User | undefined>(
    undefined
  );

  const fetchData = (pageNumber: number) => {
    setIsLoading(true);
    console.log("paging", pageNumber);
    const { response, cancel } = postService.getWithPaging(pageNumber);
    response
      .then((res) => {
        console.log("res", res);
        setPage((prevPage) => prevPage + 1);
        setPosts((prev) => [...prev, ...res.data.posts]);
        // const newPosts = res.data.posts;

        // // Handle clearPreviousData explicitly
        // // if (false) {
        // //   return [...newPosts]; // Hard reset
        // // } else {
        // return [...prev, ...newPosts]; // Append to existing posts
        // }
        //});
        setHasMorePosts(res.data.hasNextPage);

        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        if (err instanceof CanceledError) return;
        console.warn(err);
        //setError(err);
      });

    return () => cancel();
  };

  useEffect(() => {
    console.log("fetching data");
    fetchData(page);
  }, [postService]);

  useEffect(() => {
    console.log("posts from app", posts);
  }, [posts]);

  function setUserToFilterByFunc(newUser: User | undefined) {
    // console.log("****************");
    // console.trace("set user", newUser);
    // console.log("userToFilterBy", userToFilterBy);
    // console.log("****************");
    if (newUser !== undefined && newUser._id !== userToFilterBy?._id) {
      console.log("CONDITION", newUser._id);
      fetchData(page);
    }
    console.log("REACHED HERE");
    // console.log("user state", userPostsState.posts);
    setUserToFilterBy(newUser);
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
    document.body.classList.toggle("light-mode", !isDarkMode);
  }, [isDarkMode]);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <AppContent
          toggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
          userToFilterBy={userToFilterBy}
          setUserToFilterByFunc={setUserToFilterByFunc}
          fetchData={() => fetchData(page)}
          posts={posts}
          hasMorePosts={hasMorePosts}
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
  fetchData: () => void;
}> = ({
  toggleTheme,
  isDarkMode,
  userToFilterBy,
  setUserToFilterByFunc,
  posts,
  hasMorePosts,
  fetchData,
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
      <div style={{ height: "10vh" }} />{" "}
      {/* Add spacing between Navbar and MainContent */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        <MainContent
          toggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
          userToFilterBy={userToFilterBy}
          setUserToFilterByFunc={setUserToFilterByFunc}
          posts={posts}
          hasMorePosts={hasMorePosts}
          fetchData={fetchData}
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
  fetchData: () => void;
}> = ({
  userToFilterBy,
  setUserToFilterByFunc,
  posts,
  hasMorePosts,
  fetchData,
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
                userToFilterBy={userToFilterBy}
                setUserToFilterBy={setUserToFilterByFunc}
                hasMorePosts={hasMorePosts}
                fetchData={fetchData}
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
