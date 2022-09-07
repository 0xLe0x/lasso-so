import { gql } from '@urql/vue'
import client from '../../client';

export const AUTH_REQUEST = "AUTH_REQUEST";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_ERROR = "AUTH_ERROR";
export const AUTH_LOGOUT = "AUTH_LOGOUT";
export const USER_TOKEN = "USER_TOKEN";
export const USER_REQUEST = "USER_REQUEST";
export const USER_SUCCESS = "USER_SUCCESS";
export const USER_ERROR = "USER_ERROR";

const SIGNIN = gql`
  mutation ($password: String!, $email: String!) { 
    tokenAuth(password: $password, email: $email) {
      success
      errors
      user {
        id
        email
      }
      token
    }
  }
`

const state = {
  token: localStorage.getItem("user-token") || "",
  status: "",
  hasLoadedOnce: false
};

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status
};

const mutations = {
  [AUTH_REQUEST]: state => {
    state.status = "loading";
  },
  [AUTH_SUCCESS]: (state, resp) => {
    state.status = "success";
    state.token = resp.token;
    state.hasLoadedOnce = true;
  },
  [AUTH_ERROR]: state => {
    state.status = "error";
    state.hasLoadedOnce = true;
  },
  [AUTH_LOGOUT]: state => {
    state.token = "";
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
            localStorage.setItem('user-token', result.data.tokenAuth.token)
            commit(AUTH_SUCCESS, result);
            dispatch(USER_REQUEST);
            resolve(result);
          }
        })
        .catch(err => {
          commit(AUTH_ERROR, err);
          localStorage.removeItem("user-token");
          reject(err);
        });
    });
  },
  [AUTH_LOGOUT]: ({ commit }) => {
    return new Promise(resolve => {
      commit(AUTH_LOGOUT);
      localStorage.removeItem("user-token");
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
