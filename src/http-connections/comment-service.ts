import { Comment } from "../types/Comment";
import apiClient from "./api-client";
import { CanceledError, HttpService } from "./http-service";

export { CanceledError };

class CommentService extends HttpService<Comment> {
  constructor() {
    super("/comments");
  }

  getByPostId(postId: string) {
    const controller = new AbortController();
    console.log(this.endpoint + "/post/" + postId);
    const response = apiClient.get(this.endpoint + "/post/" + postId, {
      signal: controller.signal,
    });
    return { response, cancel: () => controller.abort() };
  }
}

export default new CommentService();
