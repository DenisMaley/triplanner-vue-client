import { userService } from '../_services';
import { router } from '../_helpers';

export const registration = {
    namespaced: true,
    state: { status: {}},
    actions: {
        register({ dispatch, commit }, { username, email, password }) {
            commit('registerRequest');

            userService.register(username, email, password)
                .then(
                    user => {
                        commit('registerSuccess');
                        router.push('/login');
                    },
                    error => {
                        commit('registerFailure', error);
                        dispatch('alert/error', error, { root: true });
                    }
                );
        }
    },
    mutations: {
        registerRequest(state) {
            state.status = { registering: true };
        },
        registerSuccess(state) {
            state.status = { registered: true };
        },
        registerFailure(state) {
            state.status = {};
        }
    }
};
