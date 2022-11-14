import _ from 'lodash';
import { gql } from '@urql/vue'
import client from '../../client';
import { 
  EMAIL_CONNECT_SUCCESS, EMAIL_CONNECT_ERROR, EMAIL_CONNECT_REQUEST,
  GET_EMAIL_CONNECT_STATUS_REQUEST, GET_EMAIL_CONNECT_STATUS_SUCCESS, 
  GET_EMAIL_CONNECT_STATUS_ERROR
} from "../actions/email";

const EMAIL_AUTH_REQUEST = gql`
  mutation ($auth_code: String!) {
    createEmailConnection(authCode: $auth_code) {
      success
      errors
    }
  }
`

const EMAIL_STATUS_REQUEST = gql`
  query {
    isEmailConnected
  }
`

const state = {
  status: "",
  connected: false,
  error: null
};

const getters = {
  isEmailConnected: state => state.connected,
};

const mutations = {
  [EMAIL_CONNECT_REQUEST]: state => {
    state.status = "loading";
  },
  [EMAIL_CONNECT_SUCCESS]: state => {
    state.status = "success";
    state.connected = true;
    state.error = null;
  },
  [EMAIL_CONNECT_ERROR]: (state, error) => {
    state.status = "error";
    state.connected = false;
    state.error = error;
  },
  [GET_EMAIL_CONNECT_STATUS_REQUEST]: state => {
    state.status = "loading";
  },
  [GET_EMAIL_CONNECT_STATUS_SUCCESS]: (state, is_connected) => {
    state.status = "success";
    state.connected = is_connected;
    state.error = null;
  },
  [GET_EMAIL_CONNECT_STATUS_ERROR]: (state, error) => {
    state.status = "error";
    state.connected = false;
    state.error = error;
  },
};

const actions = {
  [EMAIL_CONNECT_REQUEST]: ({ commit, dispatch }, auth_code) => {
      commit(EMAIL_CONNECT_REQUEST);
      return client.mutation(EMAIL_AUTH_REQUEST,
        { 
          auth_code: auth_code,
        })
        .toPromise()
        .then(resp => {
          var data = resp.data.createEmailConnection;
          if (data && data.success) {
            commit(EMAIL_CONNECT_SUCCESS);
          } else {
            var err;
            if (data) {
              err = data.errors[0] ? data.errors : resp.error;
            } else {
              err = resp.error;
            }
            commit(EMAIL_CONNECT_ERROR, err);
          }
        })
        .catch(err => {
          commit(EMAIL_CONNECT_ERROR, err);
        });
  },
  [GET_EMAIL_CONNECT_STATUS_REQUEST]: ({ commit, dispatch }) => {
    commit(GET_EMAIL_CONNECT_STATUS_REQUEST);
    return client.query(EMAIL_STATUS_REQUEST).toPromise()
      .then(resp => {
        if (resp.data.isEmailConnected) {
          commit(GET_EMAIL_CONNECT_STATUS_SUCCESS, resp.data.isEmailConnected);
        } else {
          var err = resp.error;
          commit(GET_EMAIL_CONNECT_STATUS_ERROR, err);
        }
      })
      .catch(err => {
        commit(GET_EMAIL_CONNECT_STATUS_ERROR, err);
      });
}
};

export default {
  actions,
  getters,
  mutations,
  state,
};
