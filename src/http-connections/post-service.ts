import { Post } from "../types/Post";
import createHttpService, { CanceledError } from "./http-service";

export { CanceledError };

const postService = createHttpService<Post>("/posts");

export default postService;
