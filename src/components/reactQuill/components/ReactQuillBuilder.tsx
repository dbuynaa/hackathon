import React from 'react';
import { FormInstance } from 'antd';

// eslint-disable-next-line import/no-named-as-default
import styled from 'styled-components';

import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.snow.css';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import quillEmoji from 'react-quill-emoji';
import 'react-quill-emoji/dist/quill-emoji.css';

import dynamic from 'next/dynamic';
import type ReactQuill from 'react-quill';

const QuillWrapper = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');
    // eslint-disable-next-line react/display-name
    return ({ ...props }) => <RQ {...props} />;
  },
  { ssr: false, loading: () => <p>Loading ...</p> },
) as typeof ReactQuill;
const { Quill } = QuillWrapper;

interface ReactQuillCustomEditorProps {
  form: FormInstance;
  field: string | (string | number)[];
  value?: string | null;
  setLength?: (_: number) => void;
  placeholder?: string | null;
}

const StyledQuil = styled(QuillWrapper)`
  height: 100% !important;
  @media (max-width: 576px) {
    height: 320px !important;
  }
  .ql-toolbar {
    display: flex !important;
    flex-wrap: wrap;
    .ql-formats {
      display: flex !important;
      gap: 4px !important;
      margin-right: 8px !important;
      align-items: center !important;
      .ql-picker-label {
        svg {
          width: 20px !important;
          height: 20px !important;
        }
      }
    }
    button {
      width: 36px !important;
      height: 36px !important;
      padding: 6px 6px !important;
      &.ql-active {
        background-color: #00b1e1 !important;
        border-radius: 12px !important;
        .ql-stroke {
          stroke: #fff !important;
        }
        &:hover .ql-stroke {
          stroke: #1f2937 !important;
        }
      }
      .ql-stroke {
        stroke: #1f2937 !important;
      }
      &:hover {
        background-color: rgba(0, 0, 0, 0.04) !important;
        border-radius: 12px !important;
      }
    }
    .ql-color,
    .ql-background {
      width: 36px !important;
      height: 36px !important;

      .ql-picker-label {
        padding: 6px 6px !important;
        &.ql-active {
          background-color: rgba(0, 0, 0, 0.04) !important;
          border-radius: 12px !important;
        }
      }
    }
    .ql-header {
      height: 36px !important;
      .ql-picker-label {
        padding: 6px 6px !important;
        &.ql-active {
          background-color: rgba(0, 0, 0, 0.04) !important;
          border-radius: 12px !important;
        }
      }
    }
  }
  .ql-container {
    height: calc(100% - 70px);
    padding-bottom: 15px;
    overflow-y: auto;
    overflow-x: hidden;
    #textarea-emoji {
      top: 40px !important;
    }
    .ql-editor {
      padding-right: 27px !important;
    }
  }

  .ql-header .ql-picker-label::before {
    content: 'サイズ' !important;
  }
  .ql-header .ql-picker-label[data-value='1']::before,
  .ql-header .ql-picker-item[data-value='1']::before {
    content: 'サイズ１' !important;
  }
  .ql-header .ql-picker-label[data-value='2']::before,
  .ql-header .ql-picker-item[data-value='2']::before {
    content: 'サイズ２' !important;
  }
  .ql-header .ql-picker-label[data-value='3']::before,
  .ql-header .ql-picker-item[data-value='3']::before {
    content: 'サイズ３' !important;
  }
  .ql-header .ql-picker-label[data-value='4']::before,
  .ql-header .ql-picker-item[data-value='4']::before {
    content: 'サイズ４' !important;
  }
  .ql-header .ql-picker-label[data-value='5']::before,
  .ql-header .ql-picker-item[data-value='5']::before {
    content: 'サイズ５' !important;
  }
  .ql-header .ql-picker-label[data-value='6']::before,
  .ql-header .ql-picker-item[data-value='6']::before {
    content: 'サイズ６' !important;
  }
  .ql-snow .ql-picker.ql-header .ql-picker-item::before {
    content: 'サイズ';
  }
  .ql-snow .ql-tooltip::before {
    content: 'リンク先のURL' !important;
  }
  .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    content: 'OK' !important;
  }
  .ql-snow .ql-tooltip a.ql-action::after {
    content: '編集' !important;
  }
  .ql-snow .ql-tooltip a.ql-remove::before {
    content: '取り除く' !important;
  }
  .ql-snow .ql-tooltip[data-mode='link']::before {
    content: 'リンク先のURL:' !important;
  }
`;

const ReactQuillBuilder = ({
  form,
  field,
  value,
  setLength,
  placeholder,
}: ReactQuillCustomEditorProps) => {
  Quill?.register(
    {
      'formats/emoji': quillEmoji?.EmojiBlot,
      'modules/emoji-toolbar': quillEmoji?.ToolbarEmoji,
      'modules/emoji-textarea': quillEmoji?.TextAreaEmoji,
      'modules/emoji-shortname': quillEmoji?.ShortNameEmoji,
    },
    true,
  );

  return (
    <StyledQuil
      className=" [&>div]:border-primary
      [&>.ql-toolbar]:rounded-t-md [&>.ql-toolbar]:p-sm 
     
      [&>.ql-container]:rounded-b-md 
      [&button]:bg-primary
      "
      // [&>.ql-toolbar]:overflow-visible [&>.ql-toolbar]:overflow-x-auto
      modules={{
        toolbar: {
          container: [
            [{ header: [1, 2, 3, 4, 5, 6] }],
            [{ align: ['', 'center', 'right', 'justify'] }],
            ['bold', 'italic', 'underline'],
            [{ color: [] }, { background: [] }],

            // [{ size: [] }],

            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean'],
          ],
        },
        'emoji-toolbar': true,
        'emoji-textarea': true,
        'emoji-shortname': true,
      }}
      theme="snow"
      value={value || ''}
      onChange={(_value, _, __, _editor) => {
        const _length = _editor.getLength();
        setLength && setLength(_length - 1);
        form.setFieldValue(field, _value);
      }}
      placeholder={placeholder || ''}
    />
  );
};

export default ReactQuillBuilder;
