import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';  // Importa o tema padrão do Quill

const QuillEditor = () => {
  const editorRef = useRef<HTMLDivElement | null>(null); // Referência para o editor
  const [editor, setEditor] = useState<Quill | null>(null); // Estado para armazenar a instância do editor

  useEffect(() => {
    if (editorRef.current) {
      // Cria uma nova instância do Quill no elemento referenciado
      const quillInstance = new Quill(editorRef.current, {
        theme: 'snow',  // Define o tema
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

      // Atualiza o estado com a instância do Quill
      setEditor(quillInstance);
    }

    // Limpeza do componente (destruir a instância do Quill quando o componente for desmontado)
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, []);

  const handleSave = () => {
    if (editor) {
      // Pega o conteúdo do editor
      const content = editor.root.innerHTML;
      console.log(content); // Você pode salvar ou enviar esse conteúdo para a API
    }
  };

  return (
    <div>
      {/* Referência do editor */}
      <div ref={editorRef} style={{ height: '400px' }}></div>
      
      {/* Botão para salvar o conteúdo */}
      <button onClick={handleSave}>Salvar</button>
    </div>
  );
};

export default QuillEditor;
