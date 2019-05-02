import Vue from 'vue';
import Vuex from 'vuex';
import * as Model from '@/model';
import { CHANGE_EDITOR_CONTENT, CHANGE_SLIDE_NUMBER, CHANGE_VIEW_MODE, TOGGLE_VIEW_MODE } from '@/vuex/mutation_types';


Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    editor_content: '# Hello, world.',
    slide_number: { h: 0, v: 0 },
    view_mode: { mode: 'edit'},
  },
  mutations: {
    [CHANGE_EDITOR_CONTENT](state: Model.State, content: string) {
      state.editor_content = content;
    },
    [CHANGE_SLIDE_NUMBER](state: Model.State, snum: Model.SlideNumber) {
      state.slide_number = snum;
    },
    [CHANGE_VIEW_MODE](state: Model.State, mode: Model.ViewMode) {
      state.view_mode = mode;
    },
    [TOGGLE_VIEW_MODE](state: Model.State) {
      state.view_mode.mode = state.view_mode.mode === 'edit' ? 'show' : 'edit';
    },
  },
  actions: {
    [CHANGE_EDITOR_CONTENT]({ commit }, content: string) {
      commit(CHANGE_EDITOR_CONTENT, content);
    },
    [CHANGE_SLIDE_NUMBER]({ commit }, snum: Model.SlideNumber) {
      commit(CHANGE_SLIDE_NUMBER, snum);
    },
    [CHANGE_VIEW_MODE]({ commit }, mode: Model.ViewMode) {
      commit(CHANGE_VIEW_MODE, mode);
    },
    [TOGGLE_VIEW_MODE]({ commit }) {
      commit(TOGGLE_VIEW_MODE);
    },
  },
  getters: {
    editor_content: (state: Model.State) => state.editor_content,
    slide_number: (state: Model.State) => state.slide_number,
    view_mode: (state: Model.State) => state.view_mode,
  },
});
