import { gql } from '@urql/vue'
import client from '../../client';
import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT } from "../actions/auth";
import { USER_REQUEST } from "../actions/user";

export const USER_AUTH_TOKEN = "USER_AUTH_TOKEN"
export const USER_AUTH_REFRESH_TOKEN = "USER_AUTH_REFRESH_TOKEN"

const SIGNIN = gql`
  mutation ($password: String!, $email: String!) { 
    tokenAuth(password: $password, email: $email) {
      success,
      errors,
      token,
      refreshToken,
      unarchiving,
      user {
        id,
        username
      }
    }
  }
`

const state = {
  token: localStorage.getItem(USER_AUTH_TOKEN) || "",
  refreshToken: localStorage.getItem(USER_AUTH_REFRESH_TOKEN) || "",
  status: "",
  hasLoadedOnce: false,
  error: null
};

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
  authToken: state => state.token,
  refreshToken: state => state.refreshToken,
};

const mutations = {
  [AUTH_REQUEST]: state => {
    state.status = "loading";
  },
  [AUTH_SUCCESS]: (state, auth) => {
    state.status = "success";
    state.token = auth.token;
    state.refreshToken = auth.refreshToken;
    state.hasLoadedOnce = true;
  },
  [AUTH_ERROR]: (state, error) => {
    state.status = "error";
    state.hasLoadedOnce = true;
    state.error = error;
  },
  [AUTH_LOGOUT]: state => {
    state.token = "";
    state.refreshToken = "";
  }
};

const actions = {
  [AUTH_REQUEST]: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST);
      client.mutation(SIGNIN,
        { 
          password: user.password, 
          email: user.email 
        })
        .toPromise()
        .then(result => {
          if (result.data.tokenAuth.success) {
            localStorage.setItem(USER_AUTH_TOKEN, result.data.tokenAuth.token)
            localStorage.setItem(USER_AUTH_REFRESH_TOKEN, result.data.tokenAuth.refreshToken)
            commit(AUTH_SUCCESS, result.data.tokenAuth);
            dispatch(USER_REQUEST, result.data.tokenAuth.user);
            resolve(result);
          }
        })
        .catch(err => {
          commit(AUTH_ERROR, err);
          localStorage.removeItem(USER_AUTH_TOKEN);
          reject(err);
        });
    });
  },
  [AUTH_LOGOUT]: ({ commit }) => {
    return new Promise(resolve => {
      commit(AUTH_LOGOUT);
      localStorage.removeItem(USER_AUTH_TOKEN);
      resolve();
    });
  }
};

export default {
  actions,
  getters,
  mutations,
  state,
};
