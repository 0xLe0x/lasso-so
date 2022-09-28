import _ from 'lodash';
import { gql } from '@urql/vue'
import client from '../../client';
import { 
  USER_CREATE, USER_VERIFY, USER_REQUEST, 
  USER_ERROR, USER_SUCCESS, USER_RESET_PASSWORD,
  USER_SEND_RESET_PASSWORD_EMAIL,
} from '../actions/user';
import { AUTH_ERROR, AUTH_LOGOUT, AUTH_REQUEST } from "../actions/auth";

const WHOAMI = gql`
  query {
    me {
      username,
      email,
      isVerified
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
    verifyAccount(
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
      newPassword1: $password,
      newPassword2: $password
    ) {
      success,
      errors
    }
  }
`

const state = { 
  status: "", 
  profile: {},
  error: null 
};

const getters = {
  getProfile: state => state.profile,
  isProfileLoaded: state => !!state.profile.username
};

const actions = {
  [USER_REQUEST]: ({ commit, dispatch }) => {
    commit(USER_REQUEST);
    client.query(WHOAMI)
      .toPromise()
      .then(resp => {
        commit(USER_SUCCESS, resp.data.me);
      })
      .catch(() => {
        commit(USER_ERROR);
        dispatch(AUTH_LOGOUT);
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
        console.log(resp);
        if (resp.data.createUser.success) {
          commit(USER_SUCCESS, user);
        } else {
          commit(USER_ERROR, resp.data.createUser.errors[0]);
        }
      })      
      .catch(err => {
        commit(USER_ERROR, err);
        commit(AUTH_ERROR, err);
        dispatch(AUTH_LOGOUT);
      });
  },
  [USER_VERIFY]: ({ commit, dispatch }, verification_token) => {
    client.mutation(VERIFY_USER, { verification_token })
      .toPromise().then(resp => {}).catch(() => {});
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

const mutations = {
  [USER_REQUEST]: state => {
    state.status = "loading";
  },
  [USER_SUCCESS]: (state, user) => {
    state.status = "success";
    state.profile = { username: user.username, email: user.email, is_verified: user.isVerified };
    state.error = null;
  },
  [USER_ERROR]: (state, error) => {
    state.status = "error";
    state.error = error;
  },
  [AUTH_LOGOUT]: state => {
    state.profile = {};
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
