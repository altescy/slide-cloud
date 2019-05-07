<template>
  <div>
    <p class="error-message" v-if='slideConfigError'>{{ slideConfigError }}</p>
    <div class="row">
      title
      <input type="text" class="input" v-model='title' autofocus='true'>
    </div>
    <div class="row">
      public
      <label class="switch">
        <input type="checkbox" v-model="is_public">
        <span class="slider round"></span>
      </label>
    </div>
    <div class="row">
      delete
      <label class="switch">
        <input type="checkbox" v-model="remove">
        <span class="slider round warn"></span>
      </label>
    </div>
    <button class="button" @click.prevent='update()'>ok</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState, mapMutations } from 'vuex';
import axios from 'axios';
import * as VuexAction from '@/vuex/action_types';
import * as VuexMutation from '@/vuex/mutation_types';
import * as Model from '@/model';

export default Vue.extend({
  name: 'SlideConfig',
  data() {
    return {
      title: '',
      is_public: false,
      remove: false,
    };
  },
  computed: {
    ...mapState(['slideConfigError', 'currentSlide']),
  },
  mounted() {
    if (this.currentSlide) {
      this.title = this.currentSlide.name;
      this.is_public = this.currentSlide.public;
    }
  },
  methods: {
    ...mapActions({
      signin: VuexAction.SIGN_IN,
      updateSlideConfig: VuexAction.UPDATE_SLIDE_CONFIG,
      deleteSlide: VuexAction.DELETE_SLIDE,
    }),
    ...mapMutations({
      closeModal: VuexMutation.CLOSE_MODAL,
      unsetSlideConfigError: VuexMutation.UNSET_SLIDECONFIG_ERROR,
    }),
    async update() {
      if (this.currentSlide) {
        if (this.remove) {
          await this.deleteSlide(this.currentSlide.access_token);
        } else {
        const data = {
          token: this.currentSlide.access_token,
          title: this.title,
          is_public: this.is_public,
        };
        await this.updateSlideConfig(data);
        }
      }
    },
  },
  watch: {
    title() {
      this.unsetSlideConfigError();
    },
    is_public() {
      this.unsetSlideConfigError();
    },
    remove() {
      this.unsetSlideConfigError();
    },
  },
});
</script>

<style lang="sass" scoped>
.error-message
  font-size: 16px
  color: rgb(255,0,0)
  text-align: center
.row
  width: 320px
  margin-bottom: 24px
  font-size: 16px
  font-weight: 500
  color: rgba(0,0,0,0.54)
  text-align: left
  &:last-of-type
    margin-bottom: 48px
.input
  display: block
  width: 100%
  appearance: none
  outline: none
  border: none
  border-bottom: 1px solid #a9a9a9
  font-size: 16px
  line-height: 20px
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1)
  &:hover
    border-bottom-color: #666
  &:focus, &:active
    border-bottom-color: #1867c0
.button
  appearance: none
  display: block
  margin: 0 auto
  border: none
  outline: none
  padding: 8px 32px
  background-color: rgba(245,245,245,1)
  box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)
  font-size: 15px
  font-weight: 500
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1)
  cursor: pointer
  &:hover
    background-color: rgba(0,0,0,0.12)
  &:active
    background-color: rgba(0,0,0,0.24)
.switch
  position: relative
  display: inline-block
  width: 60px
  height: 34px
  margin-left: 10px
  input
    opacity: 0
    width: 0
    height: 0
.slider
  position: absolute
  cursor: pointer
  top: 0
  left: 0
  right: 0
  bottom: 0
  background-color: #ccc
  -webkit-transition: .4s
  transition: .4s
  &.round
    border-radius: 34px
    &:before
      border-radius: 50%
  &:before
    position: absolute
    content: ""
    height: 26px
    width: 26px
    left: 4px
    bottom: 4px
    background-color: white
    -webkit-transition: .4s
    transition: .4s
input
  &:checked
    & + .slider
      background-color: #2196F3
      &.warn
        background-color: #ee3333
      &:before
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
  &:focus
    & + .slider
      box-shadow: 0 0 1px #2196F3
      &.warn
        box-shadow: 0 0 1px #ee3333
</style>