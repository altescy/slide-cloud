import React from 'react';
import { Flex } from '@chakra-ui/react';
import Editor from '@/components/Editor';
import Preview from '@/components/Preview';

const App = () => {
  const [content, setContent] = React.useState<string>('');
  const [line, setLine] = React.useState<number>(0);

  const handleValueChange = (value: string) => {
    setContent(value);
  }

  const currentPage = React.useMemo(() => {
    let page = 1;
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (i >= line) break;
      if (lines[i].startsWith('---')) {
        page++;
      }
    }
    return page;
  }, [line, content]);

  return (
    <Flex w="100vw" h="100vh">
      <Editor w="full" h="full" onValueChange={handleValueChange} onLineChange={setLine} />
      <Preview w="full" h="full" markdown={content}  currentPage={currentPage} />
    </Flex>
  )
}
export default App
