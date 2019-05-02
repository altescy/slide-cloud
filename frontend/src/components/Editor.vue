<template>
  <div :id="editorId" class="editor"></div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { CHANGE_EDITOR_CONTENT, CHANGE_SLIDE_NUMBER } from '@/vuex/mutation_types';
  import * as Model from '@/model';
  import * as ace from 'brace';
  import 'brace/mode/markdown';
  import 'brace/theme/github';
  import 'brace/keybinding/vim';

  export default Vue.extend({
    name: 'Editor',
    props: {
      editorId: String,
    },
    data() {
      return {
        editor: ace.edit(document.createElement('div')),
        yamlSlideIncrement: 0,
      };
    },
    mounted() {
      this.editor = ace.edit(this.editorId);
      this.editor.getSession().setMode('ace/mode/markdown');
      this.editor.setTheme('ace/theme/github');
      this.editor.setKeyboardHandler('ace/keyboard/vim');

      this.editor.getSession().on('change', () => {
        this.$store.dispatch(CHANGE_EDITOR_CONTENT, this.editor.getValue());
      });

      this.editor.getSession().selection.on('changeCursor', (e: Event) => {
        const cursorRow = this.editor.getCursorPosition().row;
        const currentSlide = this.currentCursorSlide(cursorRow);
        this.$store.dispatch(CHANGE_SLIDE_NUMBER, currentSlide);
      });
    },
    methods: {
      currentCursorSlide(cursorLine: number): Model.SlideNumber {
        const lines = this.editor.getValue().split('\n');
        let line = '';
        let slide = 0;
        let subSlide = 0;
        for (let i = 0; i <= cursorLine; i++) {
          if (line.substring(0, 3) === '---') {
            slide = slide + 1;
            subSlide = 0;
          } else if (line.substring(0, 3) === '===') {
            subSlide = subSlide + 1;
          }
          line = lines[i];
        }
        return {
          h : slide + this.yamlSlideIncrement,
          v : subSlide,
        };
      },
    },
  });

</script>


<style scoped>
  .editor { 
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
  }
</style>


