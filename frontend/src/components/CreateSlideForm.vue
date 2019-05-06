<template>
  <div>
    <p class="error-message" v-if='createSlideError'>{{ createSlideError }}</p>
    <div class="row">
      title
      <input type="text" class="input" v-model='title' autofocus='true'>
    </div>
    <button class="button" @click.prevent='postCreateSlide()'>create</button>
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
  name: 'CreateSlideForm',
  data() {
    return {
      title: '',
    };
  },
  computed: {
    ...mapState(['createSlideError']),
  },
  methods: {
    ...mapActions({createSlide: VuexAction.CREATE_SLIDE}),
    ...mapMutations({
      closeModal: VuexMutation.CLOSE_MODAL,
      unsetCreateSlideError: VuexMutation.UNSET_CREATESLIDE_ERROR,
    }),
    async postCreateSlide() {
      await this.createSlide(this.title);
    },
  },
  watch: {
    title() {
      this.unsetCreateSlideError();
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
</style>