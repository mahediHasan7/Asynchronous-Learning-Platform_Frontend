import React, { useState, useEffect, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import Delta from 'quill-delta';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import ImageResize from 'quill-image-resize-module-react';
import BlotFormatter from 'quill-blot-formatter';
import './QuillEditor.css';
import {
  DeleteAction,
  ResizeAction,
  ImageSpec,
  IframeVideoSpec,
} from 'quill-blot-formatter';
import katex from 'katex';
import 'katex/dist/katex.min.css';

window.katex = katex;

const QuillEditor = (props) => {
  Quill.register('modules/blotFormatter', BlotFormatter);
  class CustomImageSpec extends ImageSpec {
    getActions() {
      return [ResizeAction, DeleteAction];
    }
  }
  class CustomVideoSpec extends IframeVideoSpec {
    getActions() {
      return [ResizeAction, DeleteAction];
    }
  }

  // const modules = {
  //   toolbar: [
  //     [{ font: [] }],
  //     [{ size: [] }],
  //     [{ header: [1, 2, 3, 4, 5, 6, false] }],
  //     ['bold', 'italic', 'underline', 'strike'],
  //     [{ color: [] }, { background: [] }],
  //     [{ script: 'sub' }, { script: 'super' }],
  //     ['blockquote', 'code-block'],
  //     [{ list: 'ordered' }, { list: 'bullet' }],
  //     [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
  //     ['formula', 'link', 'image', 'video'],
  //     ['clean'],
  //   ],

  //   // imageResize: {
  //   //   parchment: Quill.import('parchment'),
  //   //   modules: ['Resize', 'DisplaySize'],
  //   // },

  //   blotFormatter: {
  //     specs: [CustomImageSpec],
  //     overlay: {
  //       style: {
  //         border: '1px solid #33A95B',
  //       },
  //     },
  //   },
  // };

  const modules = React.useMemo(
    () => ({
      toolbar: [
        [{ font: [] }],
        [{ size: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ color: [] }, { background: [] }],
        [{ script: 'sub' }, { script: 'super' }],
        ['blockquote', 'code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
        ['formula', 'link', 'image', 'video'],
        ['clean'],
      ],

      // imageResize: {
      //   parchment: Quill.import('parchment'),
      //   modules: ['Resize', 'DisplaySize'],
      // },

      blotFormatter: {
        specs: [CustomImageSpec, CustomVideoSpec],
        overlay: {
          style: {
            border: '1px solid #33A95B',
          },
        },
      },
    }),
    []
  );

  // React Quill use states
  const ops = [{ insert: '' }];
  const [editorValue, setEditorValue] = useState(new Delta(ops));
  const quillOutputRef = useRef();

  useEffect(() => {
    // props.onChangeEditorValue(new Delta(editorValue.ops));
    props.onChange({ value: new Delta(editorValue.ops) }); // for Input component
  }, [editorValue]);

  useEffect(() => {
    // console.log('props.editContent: ', props.editContent);
    if (props.topicContent) {
      setEditorValue(props.topicContent);
    }
  }, [props.topicContent]);

  return (
    <React.Fragment>
      <ReactQuill
        className={`react-quill-for-editor ${props.className}`}
        theme="snow"
        modules={modules}
        value={editorValue}
        onChange={(content, delta, source, editor) => {
          setEditorValue(editor.getContents());
        }}
        placeholder="Insert topic content. Formula (Latex) and video content adding instruction...."
        // formats={formats}
      />
      <div style={{ marginBottom: '2rem' }}></div>
    </React.Fragment>
  );
};

export default QuillEditor;
