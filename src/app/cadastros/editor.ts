import React, { useState } from 'react';
import { Editor, EditorState } from 'draft-js';
import createImagePlugin from 'draft-js-image-plugin';
import { EditorPlugin } from 'draft-js-plugins-editor';
import 'draft-js-image-plugin/lib/plugin.css';  // Para estilos do plugin de imagem

// Cria o plugin de imagem
const imagePlugin = createImagePlugin();

const MyEditor: React.FC = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
  };

  return (
    <div>
      <h2>Editor de Texto com Imagens no Draft.js</h2>
      <Editor
        editorState={editorState}
        onChange={onChange}
        plugins={[imagePlugin]} // Aqui você adiciona o plugin
      />
    </div>
  );
};

export default MyEditor;
