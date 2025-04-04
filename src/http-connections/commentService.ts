import { Comment } from "../types/Comment";
import apiClient from "./apiClient";
import { CanceledError, HttpService } from "./httpService";
import { ENDPOINTS } from "../endpoints";

export { CanceledError };

class CommentService extends HttpService<Comment> {
  constructor() {
    super(ENDPOINTS.COMMENT);
  }

  getByPostId(postId: string) {
    const controller = new AbortController();

    const response = apiClient.get(this.endpoint + "/post/" + postId, {
      signal: controller.signal,
    });
    return { response, cancel: () => controller.abort() };
  }
}

export default new CommentService();
