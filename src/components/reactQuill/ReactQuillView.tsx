'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import type ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill-emoji/dist/quill-emoji.css';

const QuillWrapper = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');
    // eslint-disable-next-line react/display-name
    return ({ ...props }) => <RQ {...props} />;
  },
  { ssr: false },
) as typeof ReactQuill;

export const ReactQuillCustomView = ({
  value,
  height,
  className,
}: {
  value: string | null | undefined;
  height?: number | undefined;
  className?: string;
}) => {
  return (
    <div className="react-quill-custom-view">
      <QuillWrapper
        className={className}
        style={{ height: height }}
        readOnly
        theme="bubble"
        value={value || ''}
      />
    </div>
  );
};
