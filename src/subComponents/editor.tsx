// import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";
import { useEffect, useRef, useState } from "react";

interface CustomEditorProps {
  title: string;
  name: string;
  data: string;
  onChange: any;
  required?: boolean;
  error?: any;
  style?: any;
}

const CustomEditor = ({
  title,
  name,
  data,
  onChange,
  required,
  error = '',
  style= {}
}: CustomEditorProps) => {
  const editorRef = useRef<any>();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, Editor } = editorRef.current || {};
  const defaultConfig = {
    toolbar: {
      shouldNotGroupWhenFull: true,
    },
  };
  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      Editor: require("ckeditor5-custom-build/build/ckeditor"),
    };
    setEditorLoaded(true);
  }, [name]);
  return (
    editorLoaded && (
      <div className="flex flex-col gap-2 self-stretch" style={style}>
        {title && (
          <span className="label" style={{ color: error ? "red" : "#1a1c1e" }}>
            {title}
            {required ? "*" : ""}
          </span>
        )}
        <CKEditor
          name={name}
          editor={Editor}
          data={data}
          config={defaultConfig}
          onChange={(_event: any, editor: any) => {
            const data = editor.getData();
            onChange(data);
          }}
        />
      </div>
    )
  );
};

export default CustomEditor;
