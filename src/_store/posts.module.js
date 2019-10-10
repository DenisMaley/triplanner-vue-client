import {postService} from '../_services';

export const posts = {
    namespaced: true,
    state: {
        all: {}
    },
    actions: {
        getPosts({commit}, {page}) {
            commit('getPostsRequest');

            postService.getPosts(page)
                .then(
                    posts => commit('getPostsSuccess', posts),
                    error => commit('getPostsFailure', error)
                );
        }
    },
    mutations: {
        getPostsRequest(state) {
            state.all = {loading: true};
        },
        getPostsSuccess(state, posts) {
            state.all = posts;
        },
        getPostsFailure(state, error) {
            state.all = {error};
        }
    }
};
