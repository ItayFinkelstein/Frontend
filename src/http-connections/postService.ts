import { Post } from "../types/Post";
import createHttpService, { CanceledError } from "./httpService";

export { CanceledError };

const postService = createHttpService<Post>("/post");

export default postService;
