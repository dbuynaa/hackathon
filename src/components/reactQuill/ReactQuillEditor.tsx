'use client';

import { FormInstance } from 'antd';
import dynamic from 'next/dynamic';
// import { useState } from 'react';
import type ReactQuill from '@/components/reactQuill/components/ReactQuillBuilder';
const ReactQuillBuilder = dynamic(
  async () => {
    const { default: RQ } = await import(
      '@/components/reactQuill/components/ReactQuillBuilder'
    );
    // eslint-disable-next-line react/display-name
    return ({ ...props }) => <RQ {...props} />;
  },
  { ssr: false, loading: () => <p>Loading ...</p> },
) as typeof ReactQuill;

interface ReactQuillCustomEditorProps {
  form: FormInstance;
  field: string | (string | number)[];
  value?: string | null;
  placeholder?: string | null;
}

export const ReactQuillEditor = ({
  form,
  field,
  value,
  placeholder,
}: ReactQuillCustomEditorProps) => {
  return (
    <ReactQuillBuilder
      form={form}
      field={field}
      value={value}
      // setLength={setLength}
      placeholder={placeholder}
    />
  );
};
