import apiClient, { CanceledError } from "./api-client";

export { CanceledError };

interface BaseEntity {
  _id: string;
}

class HttpService<T extends BaseEntity> {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async getAll() {
    const controller = new AbortController();
    const response = await apiClient.get(this.endpoint, {
      signal: controller.signal,
    });
    return { response, cancel: () => controller.abort() };
  }

  async add(entity: T) {
    const controller = new AbortController();
    const response = await apiClient.post(this.endpoint, entity, {
      signal: controller.signal,
    });
    return { response, cancel: () => controller.abort() };
  }

  async update(entity: T) {
    const controller = new AbortController();
    const response = await apiClient.put(this.endpoint + entity._id, entity, {
      signal: controller.signal,
    });
    return { response, cancel: () => controller.abort() };
  }

  async delete(id: string) {
    const controller = new AbortController();
    const response = await apiClient.delete(this.endpoint + id, {
      signal: controller.signal,
    });
    return { response, cancel: () => controller.abort() };
  }
}

const createHttpService = <T extends BaseEntity>(endpoint: string) => {
  return new HttpService<T>(endpoint);
};

export default createHttpService;
