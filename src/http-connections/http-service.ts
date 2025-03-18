import apiClient, { CanceledError } from "./api-client";

export { CanceledError };

/** TODO: Remove this. Obviuosly in a real production code this would NEVER be in the code itsef, even in a branch commit. */
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2Q5YTA1ODEwY2ZlZmNlZGY0MzA2NGMiLCJ0b2tlblNpZ25SYW5kb20iOjkyODQzNjYxMywiaWF0IjoxNzQyMzE2MjQwLCJleHAiOjE3NDIzMTk4NDB9.G-Ekhg9v4rtVp2KHhDzZThn4TXuSADC0Gp8Eqzmy6yg";

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
      headers: {
        authorization: `Bearer ${token}`,
      },
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
