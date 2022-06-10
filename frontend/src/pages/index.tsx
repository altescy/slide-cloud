import { useState } from 'react';

import Editor from '@/components/Editor';
import Preview from '@/components/Preview';

import type { NextPage } from 'next';

const Home: NextPage = () => {
  const [editorValue, setEditorValue] = useState('');
  return (
    <div className="flex flex-row w-screen h-screen">
      <div className="w-1/2 h-full">
        <Editor
          onChange={(value, _viewUpdate) => {
            setEditorValue(value);
          }}
        />
      </div>
      <div className="w-1/2">
        <Preview source={editorValue} />
      </div>
    </div>
  );
};

export default Home;
