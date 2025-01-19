import { api } from '../../axios';

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const response = await api.post('/token', {});

                const newAccessToken = response.data.accessToken;

                localStorage.setItem('accessToken', newAccessToken);

                originalRequest.headers['Authorization'] =
                    `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (error) {
                console.error('Falha ao renovar o token: ', error);
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    },
);
