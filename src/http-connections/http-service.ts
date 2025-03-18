import apiClient, { CanceledError } from "./api-client";

export { CanceledError };

/** TODO: Remove this. Obviuosly in a real production code this would NEVER be in the code itsef, even in a branch commit. */
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2Q3NDE1ZjM0OTAwZjU0MTQ0NWU4YzgiLCJ0b2tlblNpZ25SYW5kb20iOjU5ODMwMTA2MzcsImlhdCI6MTc0MjE2MDQwNiwiZXhwIjoxNzQyMTY0MDA2fQ.CJfng42uKliE3DqLxIwQUC4UP6jwHQVrPK5BF1nIaKE";

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
