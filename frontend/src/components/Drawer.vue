<template>
  <div id="drawer" class="mdl-layout__drawer">
    <span class="mdl-layout-title">SlideCloud</span>
    <ul class="slide-list demo-list-control mdl-list">
      <li class="mdl-list__item mdl-list__item--two-line" v-for="slide in slides" v-bind:key="slide.name" v-on:click="loadSlide(slide)">
        <span class="slide-info mdl-list__item-primary-content">
          <span>{{ slide.name }}</span>
          <span class="mdl-list__item-sub-title">{{ slide.updated_at }}</span>
        </span>
        <span class="mdl-list__item-secondary-content" v-if="slide.public">
          <span class="mdl-list__item-secondary-info">public</span>
          <i class="material-icons">public</i>
        </span>
      </li>
    </ul>
    <div class="mdl-layout-spacer"></div>
    <div class="drawer-footer">
      <div class="operation" v-on:click="openAddslideModal()">
        <i class="material-icons">note_add</i>
        <span>Add new slide</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapActions, mapMutations } from 'vuex';
import * as VuexAction from '@/vuex/action_types';
import * as VuexMutation from '@/vuex/mutation_types';
import * as Model from '@/model';

export default Vue.extend({
  name: 'Drawer',
  computed: {
    ...mapState(['user', 'slides']),
  },
  methods: {
    ...mapActions({
      loadSlide_: VuexAction.LOAD_SLIDE,
      openAddslideModal_: VuexAction.OPEN_ADDSLIDE_MODAL,
    }),
    ...mapMutations({unsetCreateContent: VuexMutation.UNSET_CREATE_CONTENT}),
    hideDrwer() {
      // depend on MDL
      const drawer = document.getElementById('drawer');
      if (drawer != null) {
        drawer.classList.remove('is-visible');
      }
      const obs = document.getElementsByClassName('mdl-layout__obfuscator');
      if (obs.length > 0) {
        obs[0].classList.remove('is-visible');
      }
    },
    loadSlide(slide: Model.Slide) {
      this.loadSlide_(slide);
      this.hideDrwer();
    },
    openAddslideModal() {
      this.unsetCreateContent();
      this.openAddslideModal_();
    },
  },
});
</script>

<style lang="sass">
$drawer_width: 300px
.mdl-layout__drawer
  width: $drawer_width
  transform: translateX(-$drawer_width - 10);

.clickable-item
  cursor: pointer
  &:hover
    background-color: rgba(0, 0, 0, 0.1);
    transition: 0.3s;

.slide-list
  white-space: nowrap
  .slide-info
    overflow: hidden
    text-overflow: ellipsis
  li
    @extend .clickable-item

.drawer-footer
  display: flex
  height: 50px
  width: 100%
  .operation
    @extend .clickable-item
    display: flex
    width: 100%
    padding: 10px
    cursor: pointer
    align-items: center
    i
      margin-right: 10px



</style>
