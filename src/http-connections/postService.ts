import { Post } from "../types/Post";
import apiClient from "./api-client";
import { CanceledError, HttpService } from "./httpService";

export { CanceledError };

class PostService extends HttpService<Post> {
  constructor() {
    super("/post");
  }
  getWithPaging(page: number) {
    const controller = new AbortController();
    const response = apiClient.get(`${this.endpoint}/paging`, {
      signal: controller.signal,
      params: { page },
    });
    return { response, cancel: () => controller.abort() };
  }
}

export default new PostService();
