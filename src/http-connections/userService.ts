import { User } from "../types/User";
import createHttpService, { CanceledError } from "./httpService";
import apiClient from "./apiClient";

export { CanceledError };

const userService = createHttpService<User>("/user");

const uploadImage = (img: File) => {
    const formData = new FormData();
    formData.append("file", img);

    const abortController = new AbortController()
    const request = apiClient.post('/file?file=' + img.name, formData, {
        headers: {
            'Content-Type': 'image/*'
        },
        signal: abortController.signal
    });
    return { request };
};

export { uploadImage };
export default userService;
