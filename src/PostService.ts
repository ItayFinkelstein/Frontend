import { AxiosResponse } from "axios";
import apiClient, { CanceledError } from "./http-connections/api-client";
import { Post } from "./types/Post";
export { CanceledError };

class PostService {
  async doFunction(func: () => Promise<AxiosResponse<Post[]>>) {
    const controller = new AbortController();
    const response = await func();
    return { response, cancel: () => controller.abort() };
  }
  async getPosts() {
    return await this.doFunction(() => apiClient.get("/posts"));
  }

  async getPostById(id: number) {
    const controller = new AbortController();
    const response = await apiClient.get<Post>(`/posts/${id}`);
    return { response, cancel: () => controller.abort() };
  }

  async createPost(post: any) {
    const controller = new AbortController();
    const response = await apiClient.post("/posts", post);
    return { response, cancel: () => controller.abort() };
  }

  async updatePost(id: number, post: any) {
    const controller = new AbortController();
    const response = await apiClient.put(`/posts/${id}`, post);
    return { response, cancel: () => controller.abort() };
  }

  async deletePost(id: number) {
    const controller = new AbortController();
    const response = await apiClient.delete(`/posts/${id}`);
    return { response, cancel: () => controller.abort() };
  }
}

export default new PostService();
