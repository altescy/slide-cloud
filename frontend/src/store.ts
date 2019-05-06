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
  createSlideError: '',
  isModalOpen: false,
  modalType: 'signup',
  editor_content: '# Hello, world.',
  slide_number: { h: 0, v: 0 },
  view_mode: 'edit',
  slides: [],
  currentSlide: null,
  createContent: null,
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
    [VuexMutation.SET_CREATESLIDE_ERROR](state: Model.State, message: string) {
      state.createSlideError = message;
    },
    [VuexMutation.UNSET_CREATESLIDE_ERROR](state: Model.State) {
      state.createSlideError = "";
    },
    [VuexMutation.SET_USER](state: Model.State, user: Model.User) {
      state.user = user;
    },
    [VuexMutation.UNSET_USER](state: Model.State) {
      state.user = null;
    },
    [VuexMutation.SET_SLIDES](state: Model.State, slides) {
      state.slides = slides;
    },
    [VuexMutation.UNSET_SLIDES](state: Model.State) {
      state.slides = [];
    },
    [VuexMutation.APPEND_SLIDE](state: Model.State, slide: Model.Slide) {
      state.slides.push(slide);
      state.slides.sort((s: Model.Slide, t: Model.Slide) => {
        if (s.updated_at < t.updated_at) {
          return 1;
        } else if (s.updated_at > t.updated_at) {
          return -1;
        }
        return 0;
      });
    },
    [VuexMutation.UPDATE_SLIDE](state: Model.State, slide: Model.Slide) {
      let s = state.slides.find((t: Model.Slide) => {
        return t.access_token === slide.access_token;
      });
      if (s) {
        s = slide;
      } else {
        throw new Error('slide not found');
      }
    },
    [VuexMutation.REMOVE_SLIDE](state: Model.State, token: string) {
      const idx = state.slides.findIndex((s: Model.Slide) => s.access_token === token);
      state.slides.splice(idx, 1);
    },
    [VuexMutation.SET_CURRENT_SLIDE](state: Model.State, slide: Model.Slide) {
      state.currentSlide = slide;
    },
    [VuexMutation.UNSET_CURRENT_SLIDE](state: Model.State) {
      state.currentSlide = null;
    },
    [VuexMutation.SET_CREATE_CONTENT](state: Model.State, content: string) {
      state.createContent = content;
    },
    [VuexMutation.UNSET_CREATE_CONTENT](state: Model.State) {
      state.createContent = null;
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
      state.view_mode = state.view_mode === 'edit' ? 'show' : 'edit';
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
    [VuexAction.OPEN_ADDSLIDE_MODAL]({ commit }) {
      commit(VuexMutation.SET_MODAL_TYPE, 'createslide');
      commit(VuexMutation.OPEN_MODAL);
    },
    [VuexAction.OPEN_SLIDECONFIG_MODAL]({ commit }) {
      commit(VuexMutation.SET_MODAL_TYPE, 'slideconfig');
      commit(VuexMutation.OPEN_MODAL);
    },
    async [VuexAction.SIGN_UP]({ commit }, data: Model.SigninInfo) {
      const params = new URLSearchParams();
      params.append('name', data.username);
      params.append('password', data.password);

      try {
        const response = await axios.post('/api/signup', params);
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
        const response = await axios.post('/api/signin', params);
        if (response.status === 200) {
          commit(VuexMutation.SET_USER, response.data);
          commit(VuexMutation.CLOSE_MODAL);
          await this.dispatch(VuexAction.FETCH_SLIDES);
        }
      } catch (error) {
        commit(VuexMutation.SHOW_SIGNIN_ERROR);
        throw error;
      }
    },
    async [VuexAction.SIGN_OUT]({ commit }) {
      const params = new URLSearchParams();
      try {
        const response = await axios.post('/api/signout', params);
        if (response.status === 200) {
          commit(VuexMutation.UNSET_USER);
          commit(VuexMutation.UNSET_SLIDES);
          commit(VuexMutation.UNSET_CURRENT_SLIDE);
          commit(VuexMutation.UNSET_CREATE_CONTENT);
        }
      } catch (error) {
        // TODO: show logout-error message
        throw error;
      }
    },
    async [VuexAction.FETCH_SLIDES]({ commit }) {
      try {
        const response = await axios.get('/api/slides?without_content');
        if (response.status === 200) {
          commit(VuexMutation.SET_SLIDES, response.data);
        }
      } catch (error) {
        // TODO: show fetch error message
        throw error;
      }
    },
    async [VuexAction.LOAD_SLIDE]({ commit }, slide: Model.Slide) {
      try {
        const response = await axios.get('/api/slide/' + slide.access_token);
        if (response.status === 200) {
          commit(VuexMutation.SET_CURRENT_SLIDE, response.data);
          commit(VuexMutation.CHANGE_EDITOR_CONTENT, response.data.content);
        }
      } catch (error) {
        // TODO: show load error message
        throw error;
      }
    },
    async [VuexAction.CREATE_SLIDE]({ commit }, title: string) {
      const content = this.state.createContent || ('# ' + title);
      const params = new URLSearchParams();
      params.append("name", title);
      params.append("content", content);
      try {
        const response = await axios.post('/api/slide', params);
        if (response.status === 200) {
          commit(VuexMutation.APPEND_SLIDE, response.data);
          commit(VuexMutation.UNSET_CREATE_CONTENT);
          commit(VuexMutation.CLOSE_MODAL);
        }
      } catch (error) {
        // TODO: show error message
        commit(VuexMutation.SET_CREATESLIDE_ERROR, error.response.data.err);
        throw error;
      }
    },
    async [VuexAction.SAVE_SLIDE]({ commit }, { token, content }) {
      const params = new URLSearchParams();
      params.append('content', content);
      try {
        const response = await axios.put('/api/slide/' + token, params);
        if (response.status === 200) {
          commit(VuexMutation.UPDATE_SLIDE, response.data);
          commit(VuexMutation.SET_CURRENT_SLIDE, response.data);
        }
      } catch (error) {
        // TODO: show error message
        throw error;
      }
    },
    async [VuexAction.UPDATE_SLIDE_CONFIG]({ commit }, { token, title, is_public }) {
      const params = new URLSearchParams();
      params.append('name', title);
      params.append('public', is_public);
      try {
        const response = await axios.put('/api/slide/' + token, params);
        if (response.status === 200) {
          // commit(VuexMutation.UPDATE_SLIDE, response.data);
          commit(VuexMutation.REMOVE_SLIDE, response.data.access_token);
          commit(VuexMutation.APPEND_SLIDE, response.data);
          commit(VuexMutation.SET_CURRENT_SLIDE, response.data);
          commit(VuexMutation.CLOSE_MODAL);
        }
      } catch (error) {
        // TODO: show error message
        throw error;
      }
    },
    async [VuexAction.DELETE_SLIDE]({ commit }, token: string) {
      try {
        const response = await axios.delete('/api/slide/' + token);
        if (response.status === 200) {
          commit(VuexMutation.REMOVE_SLIDE, token);
          if (this.state.currentSlide && this.state.currentSlide.access_token === token) {
            commit(VuexMutation.UNSET_CURRENT_SLIDE);
            commit(VuexMutation.CHANGE_EDITOR_CONTENT, '');
            commit(VuexMutation.CLOSE_MODAL);
          }
        }
      } catch (error) {
        // TODO: show error message
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

function dummy_slides() {
  const slide1: Model.Slide = {
    id: 10,
    user_id: 1,
    access_token: 'HOGEhoge',
    public: false,
    name: 'This is a dummy slide name.',
    content: '# Hello, world!',
    created_at: '2019-05-02T18:43:59+09:00',
    updated_at: '2019-05-02T18:43:59+09:00',
  };
  const slide2: Model.Slide = {
    id: 10,
    user_id: 1,
    access_token: 'HOGEhoge',
    public: true,
    name: 'This is public slide.',
    content: '# Hello, public world!',
    created_at: '2019-05-02T18:43:59+09:00',
    updated_at: '2019-05-02T18:43:59+09:00',
  };
  return [slide1, slide2];
}
