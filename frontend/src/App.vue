<template>
  <div id="app" class="mdl-layout mdl-js-layout mdl-layout--fixed-header has-drawer is-upgraded is-small-screen">
    <Header />
    <Drawer />
    <div class="main-editor-container mdl-layout__content">
      <router-view />
    </div>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import Header from '@/components/Header.vue';
import Drawer from '@/components/Drawer.vue';

export default Vue.extend({
  name: 'App',
  components: {
    Header,
    Drawer,
  },
});
</script>
