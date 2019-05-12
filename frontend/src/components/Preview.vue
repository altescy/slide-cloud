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
window.Reveal = window.Reveal || {};
window.RevealMarkdown = window.RevealMarkdown || {};

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
      history: true,
      mouseWheel: true,
      center: true,
      overview: true,
      previewLinks: true,
      slideNumber: 'c/t',
      transition: 'none', // none/fade/slide/convex/concave/zoom
      math: {
        mathjax: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js',
        config: 'TeX-AMS_HTML-full',
      },
      dependencies: [
        { src: 'reveal.js/plugin/markdown/marked.js',
          condition() { return !!document.querySelector( '[data-markdown]' ); } },
        { src: 'reveal.js/plugin/markdown/markdown.js',
          condition() { return !!document.querySelector( '[data-markdown]' ); } },
        { src: 'reveal.js/plugin/highlight/highlight.js', async: true },
        { src: 'reveal.js/plugin/notes/notes.js', async: true },
        { src: 'reveal.js/plugin/math/math.js', async: true },
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
      window.RevealMarkdown.init().then(() => {
        window.Reveal.toggleOverview(); window.Reveal.toggleOverview();
        window.Reveal.sync();
      });
    },
  },
});
</script>

<style scoped>
.reveal {
  margin: 0;
  padding: 0;
}
</style>