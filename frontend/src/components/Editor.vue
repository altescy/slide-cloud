<template>
  <div :id="editorId" class="editor"></div>
</template>


<script lang="ts">
  import Vue from 'vue';
  import { mapMutations, mapState, mapActions } from 'vuex';
  import * as VuexMutation from '@/vuex/mutation_types';
  import * as VuexAction from '@/vuex/action_types';
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
      };
    },
    computed: {
      ...mapState(['editor_content', 'currentSlide']),
    },
    methods: {
      ...mapActions({
        saveSlide_: VuexAction.SAVE_SLIDE,
        openAddslideModal: VuexAction.OPEN_ADDSLIDE_MODAL,
      }),
      ...mapMutations({
        changeEditorContent: VuexMutation.CHANGE_EDITOR_CONTENT,
        changeSlideNumber: VuexMutation.CHANGE_SLIDE_NUMBER,
        setCreateContent: VuexMutation.SET_CREATE_CONTENT,
      }),

    },
    mounted() {
      this.editor = ace.edit(this.editorId);
      this.editor.getSession().setMode('ace/mode/markdown');
      this.editor.setTheme('ace/theme/github');
      this.editor.setKeyboardHandler('ace/keyboard/vim');

      this.editor.getSession().on('change', () => {
        this.changeEditorContent(this.editor.getValue());
      });
      this.editor.commands.addCommand({
        name: 'save',
        bindKey: {
          win: 'Ctrl-S', mac: 'Command-S', sender: 'editor|cli',
        },
        exec: () => {
          if (this.currentSlide) {
            const data = {
              token: this.currentSlide.access_token,
              content: this.editor_content,
            };
            this.saveSlide_(data);
          } else {
            this.setCreateContent(this.editor_content);
            this.openAddslideModal();
          }
        },
        readOnly: true,
      });
      (ace as any).config.loadModule('ace/keyboard/vim', function(module: any) {
        var VimApi = module.CodeMirror.Vim;
        VimApi.defineEx('write', 'w', function(cm: any, input: any) {
          cm.ace.execCommand('save');
        });
      });

      const currentCursorSlide = (cursorLine: number): Model.SlideNumber => {
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
          h : slide,
          v : subSlide,
        };
      };

      this.editor.getSession().selection.on('changeCursor', (e: Event) => {
        const cursorRow = this.editor.getCursorPosition().row;
        const currentSlide = currentCursorSlide(cursorRow);
        this.changeSlideNumber(currentSlide);
      });
    },
    watch: {
      editor_content() {
        const content = this.editor.getValue();
        if (content !== this.editor_content) {
          this.editor.setValue(this.editor_content);
        }
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
