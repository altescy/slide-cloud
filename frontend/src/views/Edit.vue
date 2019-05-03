<template>
  <div class="mdl-grid">
    <div class="mdl-cell">
      <Editor editor-id="main-editor" />
    </div>
    <div v-bind:class="[view_mode.mode==='edit'? 'mdl-cell' : 'fullsize', 'mdl-cell']" v-on:keyup.space="TOGGLE_VIEW_MODE()">
      <Preview />
    </div>
  </div>
</template>


<style scoped>
.mdl-grid {
  padding: 0;
  height: 100%;
  width: 100%;
}

.mdl-grid>.mdl-cell {
  margin: 0;
  padding: 0;
  width: 50%;
}

.fullsize.mdl-cell {
  width: 100%;
  height: 100%;
}
</style>

<script lang="ts">
import Vue from 'vue';
import { mapMutations, mapGetters } from 'vuex';
import { TOGGLE_VIEW_MODE } from '@/vuex/mutation_types';
import Header from '@/components/Header.vue';
import Drawer from '@/components/Drawer.vue';
import Editor from '@/components/Editor.vue';
import Preview from '@/components/Preview.vue';

export default Vue.extend({
  name: 'edit',
  computed: {
    ...mapGetters(['view_mode']),
  },
  methods: {
    ...mapMutations([TOGGLE_VIEW_MODE]),
  },
  components: {
    Header,
    Drawer,
    Editor,
    Preview,
  },
});
</script>