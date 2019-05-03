import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import * as Model from '@/model';
import * as VuexMutation from '@/vuex/mutation_types';
import * as VuexAction from '@/vuex/action_types';


Vue.use(Vuex);


const initialState: Model.State = {
  user: null,
  hasSigninError: false,
  hasSignupError: false,
  isModalOpen: false,
  modalType: 'signup',
  editor_content: '# Hello, world.',
  slide_number: { h: 0, v: 0 },
  view_mode: { mode: 'edit'},
};

export default new Vuex.Store({
  state: initialState,
  mutations: {
    [VuexMutation.OPEN_MODAL](state: Model.State) {
      state.isModalOpen = true;
    },
    [VuexMutation.CLOSE_MODAL](state: Model.State) {
      state.isModalOpen = false;
    },
    [VuexMutation.SET_MODAL_TYPE](state: Model.State, type: Model.ModalType) {
      state.modalType = type;
    },
    [VuexMutation.SHOW_SIGNIN_ERROR](state: Model.State) {
      state.hasSigninError = true;
    },
    [VuexMutation.HIDE_SIGNIN_ERROR](state: Model.State) {
      state.hasSigninError = false;
    },
    [VuexMutation.SHOW_SIGNUP_ERROR](state: Model.State) {
      state.hasSignupError = true;
    },
    [VuexMutation.HIDE_SIGNUP_ERROR](state: Model.State) {
      state.hasSignupError = false;
    },
    [VuexMutation.SET_USER](state: Model.State, user: Model.User) {
      state.user = user;
    },
    [VuexMutation.UNSET_USER](state: Model.State) {
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
      commit(VuexMutation.SET_MODAL_TYPE, 'signup');
      commit(VuexMutation.OPEN_MODAL);
    },
    [VuexAction.OPEN_SIGNIN_MODAL]({ commit }) {
      commit(VuexMutation.SET_MODAL_TYPE, 'signin');
      commit(VuexMutation.OPEN_MODAL);
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
        commit(VuexMutation.SHOW_SIGNUP_ERROR);
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
          commit(VuexMutation.SET_USER, response.data);
          commit(VuexMutation.CLOSE_MODAL);
        }
      } catch (error) {
        commit(VuexMutation.SHOW_SIGNIN_ERROR);
        throw error;
      }
    },
    async [VuexAction.SIGN_OUT]({ commit }) {
      const params = new URLSearchParams();
      try {
        // const response = await axios.post('/api/signout', params);
        const response = await axios.post('http://localhost/api/signout', params); // development only
        if (response.status === 200) {
          commit(VuexMutation.UNSET_USER);
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
