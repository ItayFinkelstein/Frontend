import { User } from "../types/User";
import createHttpService, { CanceledError } from "./http-service";

export { CanceledError };

const postService = createHttpService<User>("/user");

export default postService;
