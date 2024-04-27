'use client';

import { Form, Modal } from 'antd';
import { styled } from 'styled-components';
import { useState } from 'react';
import {
  AlertModal,
  Button,
  PasswordInput,
  Typography,
  alertModal,
} from '@/components';
import { Rule } from 'antd/es/form';
import { Yup } from '@/lib/yup';

const StyledModal = styled(Modal)`
  .ant-modal-content {
    padding: 84px 48px 48px 48px !important;
    border-radius: 24px !important;
    .ant-modal-close {
      width: 36px;
      height: 36px;
      color: #1f2937;
      background: #f1f2f6;
      border-radius: 12px;
    }
  }
`;

type Props = {
  getdModal: boolean;
  setModal: (_e: boolean) => void;
  onComfirm?: () => void;
};

type InputType = {
  password: string;
};

export function ComfirmPasswordModal(props: Props) {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { getdModal, setModal, onComfirm } = props;
  const yupSync: Rule = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async validator({ field }: any, value) {
      await Yup.confirmPassword.validateSyncAt(field, { [field]: value });
    },
  };

  const onFinish = async (input: InputType) => {
    if (input.password === '0334034389') {
      setModal(false);
      if (onComfirm) {
        onComfirm();
      }
    } else {
      alertModal.confirm({
        base: 'error',
        title: `エラーを確認してください`,
        description: 'パスワードが間違っています。',
        okText: '戻る',
      });
    }
  };

  return (
    <StyledModal
      open={getdModal}
      footer={false}
      width="460px"
      onCancel={() => setModal(false)}
    >
      <Form
        form={form}
        name="ComfirmPassword"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="on"
        className="flex flex-col gap-xxl"
        scrollToFirstError
      >
        <div className="flex flex-col gap-lg text-center">
          <Typography weight="bold" base="H5" className="text-primary">
            設定されたパスワードを入力し、有料法人を削除してください。
          </Typography>

          <div className="flex flex-col gap-md w-full text-start">
            <PasswordInput
              {...form}
              field="password"
              rules={[yupSync]}
              placeholder="パスワード"
            />
          </div>
        </div>
        <Button
          type="primary"
          className="w-full flex justify-center"
          htmlType="submit"
        >
          削除
        </Button>
      </Form>
      <AlertModal
        base="success"
        title="有料法人が削除されました"
        onOk={() => {
          setIsModalVisible(false);
          setTimeout(() => {
            setModal(false);
          }, 500);
        }}
        okText="閉じる"
        open={isModalVisible}
        closeIcon={false}
      />
    </StyledModal>
  );
}
