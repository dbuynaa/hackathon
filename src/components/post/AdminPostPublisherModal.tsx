'use client';

import { Button, TextInput, Typography } from '@/components';
import { User } from '@/graphql/generated';
import { Form, Modal } from 'antd';
import { useState } from 'react';
interface Props {
  publisher?: User;
}
export function AdminPostPublisher({ publisher }: Props) {
  const [open, setOpen] = useState(false);
  const onCancel = () => {
    setOpen(false);
  };
  return (
    <div>
      <Typography
        className="text-primary w-full text-center cursor-pointer"
        onClick={() => setOpen(true)}
      >
        {publisher?.name}
      </Typography>
      <Modal
        open={open}
        closeIcon={false}
        title="個人情報"
        width={450}
        footer={false}
        wrapClassName="[&_.ant-modal-footer]:hidden [&_.ant-modal-header]:pb-xs2 [&_.ant-modal-header]:mb-md [&_.ant-modal-header]:border-brand [&_.ant-modal-header]:border-b-[2px] [&_.ant-modal-content]:p-xl "
      >
        <Form className="flex flex-col gap-md">
          <TextInput
            field="name"
            readOnly
            label="名前"
            defaultValue={publisher?.name}
          />

          <TextInput
            field="companyName"
            readOnly
            label="契約法人名"
            defaultValue={
              publisher?.facilities?.[0]?.company?.name ??
              publisher?.companyUsers?.[0]?.company?.name
            }
          />
          <TextInput
            readOnly
            field="facilityName"
            label={
              publisher?.accessId.startsWith('facility') ? '施設名' : '部署名'
            }
            defaultValue={publisher?.facilities?.map((f) => f.name)}
          />
          <div className="border-t-2 border-brand pt-md [&_.ant-btn]:w-full mt-md">
            <Button onClick={onCancel} type="primary">
              閉じる
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
