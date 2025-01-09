import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';  // Importa o tema padrão do Quill

const QuillEditor = () => {
  const editorRef = useRef<HTMLDivElement | null>(null); // Referência para o editor
  const [editor, setEditor] = useState<any>(null); // Defina o tipo como 'any' para evitar o erro

  useEffect(() => {
    if (editorRef.current) {
      const quillInstance = new Quill(editorRef.current, {
        theme: 'snow',  
        modules: {
          toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'align': [] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['link'],
            ['blockquote'],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            ['clean'],
          ],
        },
      });
      setEditor(quillInstance);
    }

    return () => {
      if (editor) {
        // Agora o TypeScript não vai reclamar
        editor.destroy();
      }
    };
  }, [editor]);

  const handleSave = () => {
    if (editor) {
      const content = editor.root.innerHTML;
      console.log(content);
    }
  };

  return (
    <div>
      <div ref={editorRef} style={{ height: '400px' }}></div>
      <button onClick={handleSave}>Salvar</button>
    </div>
  );
};

export default QuillEditor;
