import { User } from "../types/User";
import createHttpService, { CanceledError } from "./http-service";

export { CanceledError };

const userService = createHttpService<User>("/user/");

export default userService;
