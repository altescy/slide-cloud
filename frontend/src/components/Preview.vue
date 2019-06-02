<template>
  <div class="reveal">
    <div class="slides"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import * as Model from '@/model';

declare global {
  interface Window {
    Reveal: any;
    RevealMarkdown: any;
  }
}

window.Reveal = require('reveal.js')

export default Vue.extend({
  name: 'Preview',
  data() {
    return { is_script_loading: false };
  },
  computed: {
    ...mapState(['editor_content', 'slide_number', 'view_mode']),
  },
  created() {
    this.$root.$on('loading_script', (e: Event) => { this.is_script_loading = true; });
  },
  mounted() {
    const self = this;
    self.setContent(this.editor_content);
    self.$store.watch(
      () => self.editor_content,
      () => {
        self.setContent(self.editor_content);
        self.updateSlides();
      },
    );
    self.$store.watch(
      () => self.slide_number,
      () => window.Reveal.slide(self.slide_number.h, self.slide_number.v),
    );
    self.$store.watch(
      () => self.view_mode,
      () => window.Reveal.sync(),
    );

    window.Reveal.initialize({
      width: 1280,
      height: 800,
      controls: true,
      progress: true,
      mouseWheel: true,
      center: true,
      overview: true,
      slideNumber: 'c/t',
      transition: 'none',
      dependencies: [
        { src: '/reveal.js/plugin/markdown/marked.js',
          condition() { return !!document.querySelector( '[data-markdown]' ); } },
        { src: '/reveal.js/plugin/markdown/markdown.js',
          condition() { return !!document.querySelector( '[data-markdown]' ); } },
        { src: '/reveal.js/plugin/highlight/highlight.js', async: true },
        { src: '/reveal.js/plugin/notes/notes.js', async: true },
        { src: '/reveal.js/plugin/math/math.js', async: true },
      ],
    });
  },
  methods: {
    setContent(markdown: string) {
      const content = document.createElement('script');
      content.setAttribute('type', 'text/template');
      content.textContent = markdown;

      const sec = document.createElement('section');
      sec.setAttribute('data-markdown', '');
      sec.setAttribute('data-separator', '^---$');
      sec.setAttribute('data-separator-vertical', '^===$');
      sec.setAttribute('data-separator-notes', '^Note:');
      sec.appendChild(content);

      const slides = document.getElementsByClassName('slides')[0];
      if (slides) {
        slides.textContent = null;
        slides.appendChild(sec);
      }
    },
    updateSlides() {
      let plugins = window.Reveal.getPlugins();
      for (let i in plugins) {
          let plugin = plugins[i];
          if (typeof plugin.init === 'function') {
            plugin.init();
          }
      }
      window.Reveal.toggleOverview(); window.Reveal.toggleOverview();
      window.Reveal.sync();
    },
  },
});
</script>

<style lang="sass">
@import '../../node_modules/reveal.js/css/reveal.css'
@import '../../node_modules/reveal.js/css/theme/white.css'
@import '../../node_modules/reveal.js/lib/css/monokai.css'

.reveal
  margin: 0
  padding: 0
  .slides
    p,a,li,input
      font-size: 42px !important
      line-height: 1.3 !important
</style>
