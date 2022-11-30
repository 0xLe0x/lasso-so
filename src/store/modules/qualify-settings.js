import _ from 'lodash';
import { gql } from '@urql/vue'
import client from '../../client';
import { 
  SETTINGS_ERROR, SETTINGS_SUCCESS, 
  SETTINGS_GET, SETTINGS_UPDATE 
} from "../actions/qualify-settings";

const SETTINGS_UPDATE_MUTATION = gql`
  mutation (
    $num_posts_to_analyze: Int!, $num_followers: Int!, 
    $median_num_views: Int!, $median_num_likes: Int!,
    $locations: [String!]!, $categories: [String!]!,
    $platform: String!
    ) {
    updateQualifySettings(
        numPastPostsToAnalyze: $num_posts_to_analyze,
        medianNumViews: $median_num_views,
        medianNumLikes: $median_num_likes,
        followers: $num_followers,
        categories: $categories,
        locations: $locations,
    ){
      success
      errors
      qualifySettings {
        numPastPostsToAnalyze,
        medianNumViews,
        medianNumLikes,
        followers,
        categories,
        locations,
        createdAt,
        updatedAt,
        platform,
      }
    }
  }
`

const SETTINGS_GET_QUERY = gql`
  query ($platform: String!) {
    getQualifySettings(platform: $platform){
      numPastPostsToAnalyze,
      medianNumViews,
      medianNumLikes,
      followers,
      categories,
      locations,
      createdAt,
      updatedAt,
      platform,
    }
  }
`

const state = {
  settings: null,
  status: "",
  hasLoadedOnce: false,
  error: null
};

const getters = {
  settings: state => state.settings,
  numPostsToAnalyze: state => !!state.settings ? state.settings.numPastPostsToAnalyze : null,
  medianNumViews: state => !!state.settings ? state.settings.medianNumViews : null,
  medianNumLikes: state => !!state.settings ? state.settings.medianNumLikes : null,
  numFollowers: state => !!state.settings ? state.settings.followers : null,
  categories: state => !!state.settings ? state.settings.categories : null,
  locations: state => !!state.settings ? state.settings.locations : null,
  settingsTaskComplete: state => state.status === "success",
};

const mutations = {
  [SETTINGS_UPDATE]: state => {
    state.status = "loading";
  },
  [SETTINGS_GET]: state => {
    state.status = "loading";
  },
  [SETTINGS_SUCCESS]: (state, settings) => {
    state.status = "success";
    state.settings = settings;
    state.hasLoadedOnce = true;
    state.error = null;
  },
  [SETTINGS_ERROR]: (state, error) => {
    state.status = "error";
    state.hasLoadedOnce = true;
    state.error = error;
  },
};

const actions = {
  [SETTINGS_UPDATE]: ({ commit, dispatch }, settings) => {
      commit(SETTINGS_UPDATE);
      return client.mutation(SETTINGS_UPDATE_MUTATION,
        { 
          num_posts_to_analyze: settings.num_posts_to_analyze,
          median_num_views: settings.median_num_views,
          median_num_likes: settings.median_num_likes,
          num_followers: settings.num_followers,
          categories: settings.categories,
          locations: settings.locations,
        })
        .toPromise()
        .then(resp => {
          var data = resp.data.updateQualifySettings;
          if (data && data.success) {
            commit(SETTINGS_SUCCESS, data.qualifySettings);
          } else {
            var err;
            if (data) {
              err = data.errors ? data.errors[0] : resp.error;
            } else {
              err = resp.error;
            }
            commit(SETTINGS_ERROR, err);
          }
        })
        .catch(err => {
          commit(SETTINGS_ERROR, err);
        });
  },
  [SETTINGS_GET]: ({ commit, dispatch }, platform) => {
    commit(SETTINGS_GET);
    return client.query(SETTINGS_GET_QUERY,
        { platform: platform }
      ).toPromise().then(resp => {
        var data = resp.data.getQualifySettings;
        if (data) {
          commit(SETTINGS_SUCCESS, data);
        } else {
          var err;
          if (data) {
            err = data.errors ? data.errors[0]: resp.error;
          } else {
            err = resp.error;
          }
          commit(SETTINGS_ERROR, err);
        }
      })
      .catch(err => {
        commit(SETTINGS_ERROR, err);
      });
  },
};

export default {
  actions,
  getters,
  mutations,
  state,
};
