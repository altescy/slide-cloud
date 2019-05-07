<template>
  <div id="app" class="mdl-layout mdl-js-layout mdl-layout--fixed-header has-drawer is-upgraded is-small-screen">
    <Header />
    <Drawer />
    <div class="main-editor-container mdl-layout__content">
      <router-view />
    </div>
    <Modal v-if="isModalOpen"/>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
import Header from '@/components/Header.vue';
import Drawer from '@/components/Drawer.vue';
import Modal from '@/components/Modal.vue';
import * as VuexAction from '@/vuex/action_types';

export default Vue.extend({
  name: 'App',
  components: {
    Header,
    Drawer,
    Modal,
  },
  computed: {
    ...mapState(['isModalOpen', 'user']),
  },
  methods: {
    ...mapActions({
      fetchUser: VuexAction.FETCH_USER,
      fetchSlides: VuexAction.FETCH_SLIDES,
    }),
  },
  mounted() {
    this.fetchUser().then(() => {
      if (this.user) {
        this.fetchSlides();
      }
    });
  },
});
</script>
