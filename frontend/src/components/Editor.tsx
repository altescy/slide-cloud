import React from 'react';
import { Box, type BoxProps } from '@chakra-ui/react';
import { useCodeMirror } from '@uiw/react-codemirror';

interface EditorProps extends BoxProps {
  onValueChange?: (value: string) => void;
  onLineChange?: (line: number) => void;
}

const Editor = ({onValueChange, onLineChange, ...props}: EditorProps) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const editor = useCodeMirror({
    width: '100%',
    height: '100%',
    container: ref.current,
    editable: true,
    basicSetup: {
      lineNumbers: false,
      foldGutter: false,
    },
    onChange(value, _) {
      onValueChange?.(value);
    },
    onStatistics(data) {
      onLineChange?.(data.line.number);
    }
  });

  React.useEffect(() => {
    if (ref.current) {
      editor.setContainer(ref.current);
    }
  }, [ref.current]); // eslint-disable-line react-hooks/exhaustive-deps

  return  (
  <Box {...props} ref={ref}/>
  );
}

export default Editor;
