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

  getAll() {
    const controller = new AbortController();
    const response = apiClient.get(this.endpoint, {
      signal: controller.signal,
    });
    return { response, cancel: () => controller.abort() };
  }

  add(entity: Omit<T, "_id">) {
    const controller = new AbortController();

    const response = apiClient.post(this.endpoint, entity, {
      signal: controller.signal,
    });
    return { response, cancel: () => controller.abort() };
  }

  update(entity: T) {
    const controller = new AbortController();
    const response = apiClient.put(this.endpoint + "/" + entity._id, entity, {
      signal: controller.signal,
    });
    return { response, cancel: () => controller.abort() };
  }

  delete(id: string) {
    const controller = new AbortController();
    const response = apiClient.delete(this.endpoint + "/" + id, {
      signal: controller.signal,
    });
    return { response, cancel: () => controller.abort() };
  }
}

const createHttpService = <T extends BaseEntity>(endpoint: string) => {
  return new HttpService<T>(endpoint);
};

export { HttpService };

export default createHttpService;
