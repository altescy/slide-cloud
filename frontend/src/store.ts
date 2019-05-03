import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import * as Model from '@/model';
import * as VuexMutation from '@/vuex/mutation_types';
import * as VuexAction from '@/vuex/action_types';


Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    user: null,
    hasSigninError: false,
    hasSignupError: false,
    isModalOpen: false,
    modalType: 'signup',
    editor_content: '# Hello, world.',
    slide_number: { h: 0, v: 0 },
    view_mode: { mode: 'edit'},
  },
  mutations: {
    openModal(state) {
      state.isModalOpen = true;
    },
    closeModal(state) {
      state.isModalOpen = false;
    },
    setModalType(state, type) {
      state.modalType = type;
    },
    showSigninError(state) {
      state.hasSigninError = true;
    },
    hideSigninError(state) {
      state.hasSigninError = false;
    },
    showSignupError(state) {
      state.hasSignupError = true;
    },
    hideSignupError(state) {
      state.hasSignupError = false;
    },
    setUser(state, user) {
      state.user = user;
    },
    unsetUser(state) {
      state.user = null;
    },
    [VuexMutation.CHANGE_EDITOR_CONTENT](state: Model.State, content: string) {
      state.editor_content = content;
    },
    [VuexMutation.CHANGE_SLIDE_NUMBER](state: Model.State, snum: Model.SlideNumber) {
      state.slide_number = snum;
    },
    [VuexMutation.CHANGE_VIEW_MODE](state: Model.State, mode: Model.ViewMode) {
      state.view_mode = mode;
    },
    [VuexMutation.TOGGLE_VIEW_MODE](state: Model.State) {
      state.view_mode.mode = state.view_mode.mode === 'edit' ? 'show' : 'edit';
    },
  },
  actions: {
    [VuexAction.OPEN_SIGNUP_MODAL]({ commit }) {
      commit('setModalType', 'signup');
      commit('openModal');
    },
    [VuexAction.OPEN_SIGNIN_MODAL]({ commit }) {
      commit('setModalType', 'signin');
      commit('openModal');
    },
    async [VuexAction.SIGN_UP]({ commit }, data: Model.SigninInfo) {
      const params = new URLSearchParams();
      params.append('name', data.username);
      params.append('password', data.password);

      try {
        // const response = await axios.post('/api/signup', params);
        const response = await axios.post('http://localhost/api/signup', params); // development only
        if (response.status === 200) {
          await this.dispatch(VuexAction.SIGN_IN, data);
        }
      } catch (error) {
        commit('showSignupError');
        throw error;
      }
    },
    async [VuexAction.SIGN_IN]({ commit }, data: Model.SigninInfo) {
      const params = new URLSearchParams();
      params.append('name', data.username);
      params.append('password', data.password);

      try {
        // const response = await axios.post('/api/signin', params);
        const response = await axios.post('http://localhost/api/signin', params); // development only
        if (response.status === 200) {
          commit('setUser', response.data);
          commit('closeModal');
        }
      } catch (error) {
        commit('showSigninError');
        throw error;
      }
    },
    async [VuexAction.SIGN_OUT]({ commit }) {
      const params = new URLSearchParams();
      try {
        // const response = await axios.post('/api/signout', params);
        const response = await axios.post('http://localhost/api/signout', params); // development only
        if (response.status === 200) {
          commit('unsetUser');
        }
      } catch (error) {
        // TODO: show logout-error message
        throw error;
      }
    },
  },
  getters: {
    editor_content: (state: Model.State) => state.editor_content,
    slide_number: (state: Model.State) => state.slide_number,
    view_mode: (state: Model.State) => state.view_mode,
  },
});
