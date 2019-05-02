<template>
  <header v-bind:class="[view_mode.mode==='show'? 'hovershow':'', 'mdl-layout__header']">
    <div class="mdl-layout__drawer-button">
      <i class="material-icons">dehaze</i>
    </div>
    <div class="mdl-layout__header-row">
      <span class="mdl-layout-title">SlideCloud</span>
      <div class="mdl-layout-spacer"></div>
      <button class="mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect" v-on:click="TOGGLE_VIEW_MODE()">
        <i class="material-icons">{{ view_mode.mode=='show'? 'fullscreen_exit':'fullscreen' }}</i>
      </button>
      <button class="mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect" id="more-button">
        <i class="material-icons">more_vert</i>
      </button>
      <ul class="mdl-menu mdl-js-menu mdl-menu--bottom-right mdl-js-ripple-effect" for="more-button">
        <li class="mdl-menu__item">Sign In</li>
        <li disabled class="mdl-menu__item">Sign Out</li>
      </ul>
    </div>
  </header>
</template>

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

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { TOGGLE_VIEW_MODE } from '@/vuex/mutation_types';

export default Vue.extend({
  name: 'Header',
  computed: {
    ...mapGetters(['view_mode']),
  },
  methods: {
    ...mapActions([TOGGLE_VIEW_MODE]),
  },
});
</script>
