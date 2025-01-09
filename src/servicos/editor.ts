import React, { useState } from 'react';
import { Editor, EditorState } from 'draft-js';

const MyEditor: React.FC = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
  };

  return (
    <div>
      <h2>Editor de Texto com Draft.js</h2>
      <Editor editorState={editorState} onChange={onChange} />
    </div>
  );
};

export default MyEditor;
