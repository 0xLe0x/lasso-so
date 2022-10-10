import _ from 'lodash';
import { gql } from '@urql/vue'
import client from '../../client';
import { 
  USER_CREATE, USER_VERIFY, USER_REQUEST, 
  USER_ERROR, USER_SUCCESS, USER_RESET_PASSWORD,
  USER_SEND_RESET_PASSWORD_EMAIL, USER_LOGOUT
} from '../actions/user';
import { AUTH_LOGOUT } from "../actions/auth";

export const USER_PROFILE = "USER_PROFILE"

const LOGIN_USER = gql`
  mutation ($username: String!, $password: String!) {
    loginUser (username: $username, password: $password) {
      user {
        username
        email
        isVerified
      }
      success
      errors
    }
  }
`

const LOGOUT_USER = gql`
  mutation {
    logoutUser {
      success
      errors
    }
  }
`

const CREATE_USER = gql` 
  mutation ($email: String!, $username: String!, $password: String!) {
    createUser (
      email: $email,
      username: $username,
      password: $password,
    ) {
      user {
        username,
        email,
        isVerified
      }
      success,
      errors
    }
  }
`

const VERIFY_USER = gql` 
  mutation ($verification_token: String!) {
    verifyUser(
      token: $verification_token,
    ) {
      success,
      errors
    }
  }
`

const SEND_RESET_PASSWORD_EMAIL = gql`
  mutation ($email: String!) {
    sendPasswordResetEmail(
      email: $email
    ) {
      success,
      errors
    }
  }
`

const RESET_PASSWORD = gql`
  mutation ($reset_token: String!, $password: String!) {
    passwordReset(
      token: $reset_token,
      newPassword: $password,
    ) {
      success,
      errors
    }
  }
`

const state = { 
  status: "", 
  profile: JSON.parse(localStorage.getItem(USER_PROFILE)) || {},
  error: null 
};

const getters = {
  getProfile: state => state.profile,
  isProfileLoaded: state => !!state.profile.username
};

const mutations = {
  [USER_REQUEST]: state => {
    state.status = "loading";
  },
  [USER_SUCCESS]: (state, user) => {
    state.status = "success";
    state.profile = user;
    state.error = null;
  },
  [USER_ERROR]: (state, error) => {
    state.status = "error";
    state.error = error;
  },
  [USER_LOGOUT]: state => {
    state.status = "";
    state.profile = {};
  }
};

const actions = {
  [USER_REQUEST]: ({ commit, dispatch }, user) => {
    commit(USER_REQUEST, {
      username: user.username,
      password: user.password
    });
    return client.mutation(LOGIN_USER, {
      username: user.username,
      password: user.password
    }).toPromise()
      .then(resp => {
        localStorage.setItem(USER_PROFILE, JSON.stringify(resp.data.loginUser.user));
        console.log("set profile: ", resp.data.loginUser.user);
        commit(USER_SUCCESS, resp.data.loginUser.user);
      })
      .catch(() => {
        commit(USER_ERROR);
        localStorage.removeItem(USER_PROFILE);
        console.log("rmeoved profile 1: ");
        dispatch(AUTH_LOGOUT);
      });
  },
  [USER_LOGOUT]: ({ commit, dispatch }) => {
    commit(USER_LOGOUT);
    return client.mutation(LOGOUT_USER).toPromise()
      .then(resp => {
        localStorage.removeItem(USER_PROFILE);
        console.log("rmeoved profile 2: ");
      }).catch(() => {
        commit(USER_ERROR);
        localStorage.removeItem(USER_PROFILE);
        console.log("rmeoved profile 3: ");
      });
  },
  [USER_CREATE]: ({ commit, dispatch }, user) => {
    commit(USER_REQUEST);
    return client.mutation(CREATE_USER, { 
        email: user.email, 
        username: user.username,
        password: user.password,
      })
      .toPromise()
      .then(resp => {
        if (resp.data.createUser.success) {
          commit(USER_SUCCESS, user);
        } else {
          commit(USER_ERROR, resp.data.createUser.errors[0]);
        }
      })      
      .catch(err => {
        commit(USER_ERROR, err);
        dispatch(AUTH_LOGOUT);
      });
  },
  [USER_VERIFY]: ({ commit, dispatch }, verification_token) => {
    return client.mutation(VERIFY_USER, { verification_token })
      .toPromise().then(resp => {
        if (resp.data.verifyUser.errors) {
          commit(USER_ERROR, resp.data.verifyUser.errors[0]);
        }
      }).catch(() => {}); // TODO handle errors
  },
  [USER_SEND_RESET_PASSWORD_EMAIL]: ({ commit, dispatch }, email) => {
    client.mutation(SEND_RESET_PASSWORD_EMAIL, { email })
      .toPromise().then(resp => {}).catch(() => {});
  },
  [USER_RESET_PASSWORD]: ({ commit, dispatch }, request) => {
    client.mutation(RESET_PASSWORD, { 
      reset_token: request.reset_token,
      password: request.password,
    })
      .toPromise().then(resp => {}).catch(() => {});
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
