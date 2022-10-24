import _ from 'lodash';
import { gql } from '@urql/vue'
import client from '../../client';
import { TASK_SUCCESS, TASK_ERROR, TASK_REQUEST } from "../actions/creator-finder";

const FIND_CREATORS = gql`
  mutation ($urls: [String]!, $platforms: [String]!, $locations: [String]) {
    createCreatorFinderTasks (urls: $urls, platforms: $platforms, locations: $locations) {
      taskIds,
      success,
      errors
    }
  }
`

const state = {
  status: "",
  error: null,
  platformsSelected: [],
  locationsSelected: [],
};

const getters = {
  taskStatus: state => state.status,
  taskError: state => state.error,
};

const mutations = {
  [TASK_REQUEST]: state => {
    state.status = "loading";
  },
  [TASK_SUCCESS]: state => {
    state.status = "success";
    state.error = null;
  },
  [TASK_ERROR]: (state, error) => {
    state.status = "error";
    state.error = error;
  },
};

const actions = {
  [TASK_REQUEST]: ({ commit, dispatch }, input) => {
      commit(TASK_REQUEST);
      return client.mutation(FIND_CREATORS,
        { 
          urls: input.urls,
          platforms: input.platforms,
          locations: input.locations,
        })
        .toPromise()
        .then(resp => {
          if (resp.data.createCreatorFinderTasks) {
            commit(TASK_SUCCESS);           
          } else {
            commit(TASK_ERROR, resp.error.graphQLErrors[0].message);
          }
        })
        .catch(err => {
          commit(TASK_ERROR, err);
        });
  }
};

export default {
  actions,
  getters,
  mutations,
  state,
};
