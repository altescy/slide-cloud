import { markdown } from '@codemirror/lang-markdown';
import { ViewUpdate } from '@codemirror/view';
import CodeMirror from '@uiw/react-codemirror';

interface Props {
  onChange?(value: string, viewUpdate: ViewUpdate): void;
}

const Editor = ({ onChange }: Props) => {
  return <CodeMirror value="" height="100%" extensions={[markdown()]} onChange={onChange} />;
};

export default Editor;
