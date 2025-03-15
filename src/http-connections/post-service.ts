import { Post } from "../types/Post";
import createHttpService, { CanceledError } from "./http-service";

export { CanceledError };

const postService = createHttpService<Post>("/post");

export default postService;
