<template>
  <header v-bind:class="[view_mode==='show'? 'hovershow':'', 'mdl-layout__header']">
    <div class="mdl-layout__drawer-button">
      <i class="material-icons">dehaze</i>
    </div>
    <div class="mdl-layout__header-row">
      <span class="mdl-layout-title">SlideCloud</span>
      <div class="mdl-layout-spacer"></div>
      <button class="mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect" v-if="user" v-on:click="saveSlide()">
        <i class="material-icons">save</i>
      </button>
      <button class="mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect" v-on:click="toggleViewMode()">
        <i class="material-icons">{{ view_mode=='show'? 'fullscreen_exit':'fullscreen' }}</i>
      </button>
      <button class="mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect" id="more-button">
        <i class="material-icons">more_vert</i>
      </button>
      <ul class="mdl-menu mdl-js-menu mdl-menu--bottom-right mdl-js-ripple-effect" for="more-button" v-if="user">
        <li class="mdl-menu__item" >{{ user.name }}</li>
        <li class="mdl-menu__item" v-on:click="signout()">Sign Out</li>
      </ul>
      <ul class="mdl-menu mdl-js-menu mdl-menu--bottom-right mdl-js-ripple-effect" for="more-button" v-else>
        <li class="mdl-menu__item" v-on:click="openSignupModal()" >Sign Up</li>
        <li class="mdl-menu__item" v-on:click="openSigninModal()" >Sign In</li>
      </ul>
    </div>
  </header>
</template>


<script lang="ts">
import Vue from 'vue';
import { mapState, mapActions, mapMutations } from 'vuex';
import * as VuexAction from '@/vuex/action_types';
import * as VuexMutation from '@/vuex/mutation_types';

export default Vue.extend({
  name: 'Header',
  computed: {
    ...mapState(['user', 'view_mode', 'currentSlide', 'editor_content']),
  },
  methods: {
    ...mapMutations({
      toggleViewMode_: VuexMutation.TOGGLE_VIEW_MODE,
      setCreateContent: VuexMutation.SET_CREATE_CONTENT,
    }),
    ...mapActions({
      openSigninModal: VuexAction.OPEN_SIGNIN_MODAL,
      openSignupModal: VuexAction.OPEN_SIGNUP_MODAL,
      openAddslideModal: VuexAction.OPEN_ADDSLIDE_MODAL,
      signout: VuexAction.SIGN_OUT,
      saveSlide_: VuexAction.SAVE_SLIDE,
    }),
    toggleViewMode() {
      const doc = window.document.documentElement;
      if (this.view_mode === 'edit') {
        doc.requestFullscreen.apply(doc);
      } else {
        window.document.exitFullscreen();
      }
      this.toggleViewMode_();
    },
    saveSlide() {
      if (this.currentSlide) {
        const data = {
          token: this.currentSlide.access_token,
          content: this.editor_content,
        };
        this.saveSlide_(data);
      } else {
        this.setCreateContent(this.editor_content);
        this.openAddslideModal();
      }
    },
  },
});
</script>


<style scoped>
.mdl-layout__header {
  background-color: #2a2b51;
}
.mdl-layout__header-row {
  padding: 0 40px 0 80px;
}
i {
  padding-right: 16px;
}
.hovershow {
  position: absolute;
  opacity: 0;
  transition: all .3s ease;
}
.hovershow:hover {
  opacity: 0.7;
}
</style>