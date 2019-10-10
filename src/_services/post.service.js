import config from 'config';
import {authHeader} from '../_helpers';
import {responseService} from "./response.service";

export const postService = {
    getPosts
};

function getPosts(page) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/posts?page=` + page, requestOptions).then(responseService.handleResponse);
}