// import React, { createContext, useContext, useState, ReactNode } from "react";
// import postService, { CanceledError } from "./http-connections/postService";
// import { Post } from "./types/Post";

// type PostStoreContextType = {
//   posts: Post[];
//   isLoading: boolean;
//   hasMorePosts: boolean;
//   error: string | null;
//   fetchPosts: (clearPreviousData?: boolean) => void;
//   resetPosts: () => void;
// };

// const PostStoreContext = createContext<PostStoreContextType | undefined>(
//   undefined
// );

// export const PostStoreProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [hasMorePosts, setHasMorePosts] = useState(true);
//   const [page, setPage] = useState(1);
//   const [error, setError] = useState<string | null>(null);

//   // Store the cancel function to cancel previous requests
//   const [cancelRequest, setCancelRequest] = useState<(() => void) | null>(null);

//   const fetchPosts = (clearPreviousData?: boolean) => {
//     // Cancel the previous request if it exists
//     if (cancelRequest) {
//       cancelRequest();
//     }

//     setIsLoading(true);
//     setError(null); // Clear any previous errors

//     // Reset page and posts if clearPreviousData is true
//     if (clearPreviousData) {
//       setPage(1);
//       setPosts([]);
//     }

//     const { response, cancel } = postService.getWithPaging(clearPreviousData ? 1 : page);
//     setCancelRequest(() => cancel); // Store the cancel function

//     response
//       .then((res) => {
//         setPosts((prev) => {
//           const newPosts = res.data.posts;

//           // Handle clearPreviousData explicitly
//           if (clearPreviousData) {
//             return [...newPosts]; // Hard reset
//           } else {
//             return [...prev, ...newPosts]; // Append to existing posts
//           }
//         });
//         setHasMorePosts(res.data.hasNextPage);
//         setPage((prevPage) => prevPage + 1);
//         setIsLoading(false);
//       })
//       .catch((err) => {
//         setIsLoading(false);
//         if (err instanceof CanceledError) return; // Ignore canceled requests
//         console.warn(err);
//         setError("Failed to fetch posts. Please try again.");
//       });
//   };

//   const resetPosts = () => {
//     setPage(1);
//     setPosts([]);
//     setHasMorePosts(true);
//     setError(null);
//   };

//   return (
//     <PostStoreContext.Provider
//       value={{ posts, isLoading, hasMorePosts, error, fetchPosts, resetPosts }}
//     >
//       {children}
//     </PostStoreContext.Provider>
//   );
// };

// export const usePostStore = () => {
//   const context = useContext(PostStoreContext);
//   if (!context) {
//     throw new Error("usePostStore must be used within a PostStoreProvider");
//   }
//   return context;
// };
