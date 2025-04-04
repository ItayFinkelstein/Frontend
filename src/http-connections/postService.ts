import { Post } from "../types/Post";
import apiClient from "./apiClient";
import { CanceledError, HttpService } from "./httpService";
import { ENDPOINTS } from "../endpoints";

export { CanceledError };

class PostService extends HttpService<Post> {
  constructor() {
    super(ENDPOINTS.POST);
  }
  getWithPaging(page: number, userId?: string) {
    const controller = new AbortController();
    const response = apiClient.get(`${this.endpoint}/paging`, {
      signal: controller.signal,
      params: { page, userId },
    });
    return { response, cancel: () => controller.abort() };
  }
}

export default new PostService();
