import { createStore } from 'vuex';
import axios from 'axios';
import helper from '@/utils/helper';

export default createStore({
  state: {
    activities: [],
    showZoomViewModal: false,
    loading: false,
    dataLoaded: false,
    hiddenActivities: sessionStorage.getItem('hiddenActivities') || [],
  },
  getters: {
    getActivities: (state) => helper.groupByMonth(state.activities),
    getTopicNames: (state) => {
      const topics = new Set();
      state.activities.forEach((item) => {
        topics.add(item.name);
      });
      return [...topics];
    },
    getActivityById: (state) => (id) => {
      return state.activities.filter((item) => item.id === id)[0];
    },
  },
  mutations: {
    UPDATE_ACTIVITIES(state, payload) {
      const res = [];
      payload.forEach((item) => res.push(helper.flattenObject(item)));
      state.activities = res;
      state.dataLoaded = true;
    },
    TOGGLE_LOADER(state, payload) {
      state.loading = payload;
    },
    TOGGLE_ZOOM_VIEW_MODAL(state) {
      state.showZoomViewModal = !state.showZoomViewModal;
    },
    ADD_ACTIVITY_TO_HIDDEN(state, id) {
      if (sessionStorage.getItem('hiddenActivities') === null) {
        sessionStorage.setItem('hiddenActivities', JSON.stringify([id]));
      } else {
        const items = JSON.parse(sessionStorage.getItem('hiddenActivities'));
        items.push(id);
        sessionStorage.setItem('hiddenActivities', JSON.stringify(items));
      }
      state.hiddenActivities.push(id);
    },
  },
  actions: {
    async GET_ACTIVITIES({ commit }) {
      commit('TOGGLE_LOADER', true);
      await axios.get('http://localhost:3000/activities/v2')
        .then((response) => commit('UPDATE_ACTIVITIES', response.data))
        .catch((e) => console.warn(e))
        .finally(() => {
          commit('TOGGLE_LOADER', false);
        });
    },
  },
  modules: {
  },
});
