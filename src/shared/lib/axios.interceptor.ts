import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

let flag = 0;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    try {
      if (error.response?.status === 401) {
        if (flag) return;
        flag = 1;

        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token available");

        const renewResponse = await axios.post("http://localhost:3000/auth/renew", {
          accessToken: refreshToken,
        });

        localStorage.setItem("accessToken", renewResponse.data.accessToken);

        const responseOfResendRequest = await api.request(error.config);

        return responseOfResendRequest;
      }
    } catch {
      return Promise.reject(error);
    }
  }
);

export default api;
