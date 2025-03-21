import { Post } from "../types/Post";
import createHttpService, { CanceledError } from "./httpService";
import { ENDPOINTS } from "../endpoints";

export { CanceledError };

const postService = createHttpService<Post>(ENDPOINTS.POST);

export default postService;
