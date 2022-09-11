import _ from 'lodash';
import { gql } from '@urql/vue'
import client from '../../client';
import { 
  USER_CREATE, USER_VERIFY, USER_REQUEST, 
  USER_ERROR, USER_SUCCESS, USER_RESET_PASSWORD,
  USER_SEND_RESET_PASSWORD_EMAIL,
} from '../actions/user';
import { AUTH_ERROR, AUTH_LOGOUT, AUTH_SUCCESS } from "../actions/auth";

const WHOAMI = gql`
  query ($user_id: ID!) {
    user (id: $user_id){
      username,
      verified
    }
  }
`

const CREATE_USER = gql` 
  mutation ($email: String!, $username: String!, $password: String!) {
    register(
      email: $email,
      username: $username,
      password1: $password,
      password2: $password
    ) {
      success,
      errors,
      token,
      refreshToken
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
  isProfileLoaded: state => !!state.profile.name
};

const actions = {
  [USER_REQUEST]: ({ commit, dispatch }, user) => {
    commit(USER_REQUEST);
    client.query(WHOAMI, { user_id: user.id })
      .toPromise()
      .then(resp => {
        commit(USER_SUCCESS, resp.data.user);
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
        if (resp.data.register.success) {
          commit(USER_SUCCESS, user);
          commit(AUTH_SUCCESS, user);
        } else {
          const err_msgs = _.flow([
            Object.entries,
            arr => arr.filter(([key, value]) => ['email', 'username', 'password2'].indexOf(key) > -1),
            Object.fromEntries,
            Object.values
          ])(resp.data.register.errors);
          commit(USER_ERROR, err_msgs[0][0].message);
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
    state.profile = user;
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
