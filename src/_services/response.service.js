import { userService } from '../_services';

export const responseService = {
    handleResponse
};

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {

            if (response.status === 401) {
                // auto logout if 401 response returned from api
                userService.logout();
                location.reload();
                return;
            } else {
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
        }

        return data;
    });
}