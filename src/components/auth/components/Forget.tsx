'use client';

import { TextInput, Button, Typography, alertModal } from '@/components';
import { IoPersonOutline } from 'react-icons/io5';
import { AuthType, forgotTypeProps } from '../type';
import { Form } from 'antd';
import { Yup } from '@/lib/yup';
import { Rule } from 'antd/es/form';
import { useUserForgotPasswordMutation } from '@/graphql/generated';

type ForgotPasswordInput = {
  email: string;
};

export function Forget({ setAuthType, setEmail }: forgotTypeProps) {
  const [form] = Form.useForm();

  const yupSync: Rule = {
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    async validator({ field }: any, value) {
      await Yup.forgetPasswordEmail.validateSyncAt(field, { [field]: value });
    },
  };

  const [onForgotPassword, { loading }] = useUserForgotPasswordMutation({
    onCompleted: () => {
      setAuthType(AuthType.Confirmation);
    },
    onError: (error) => {
      alertModal.confirm({
        base: 'error',
        title: `エラーを確認してください`,
        description: error.message,
        okText: '戻る',
      });
    },
  });

  const onFinish = (values: ForgotPasswordInput) => {
    if (values.email) {
      setEmail(values.email);
      onForgotPassword({
        variables: {
          email: values.email,
        },
      });
    }
  };

  return (
    <Form
      form={form}
      name="ForgetEmail"
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={(errorInfo) => {
        console.log('Failed:', errorInfo);
      }}
      autoComplete="on"
      className="flex flex-col gap-xxl p-md items-center "
      scrollToFirstError
    >
      <div className="flex flex-col gap-lg">
        <div className="flex flex-col gap-xs2">
          <Typography weight="bold" base="H5" className="text-primary">
            パスワード再設定する
          </Typography>
          <Typography className="text-secondary">
            ご登録されているメールアドレスに確認コードをお送りします。
          </Typography>
        </div>
        <TextInput
          field="email"
          rules={[yupSync]}
          placeholder="メールアドレス"
          className="border-none  bg-surface-secondary [&>input]:bg-surface-secondary rounded-md "
          prefix={<IoPersonOutline />}
        />
      </div>
      <Button
        type="primary"
        className="w-full "
        htmlType="submit"
        disabled={loading}
        loading={loading}
      >
        送信
      </Button>
    </Form>
  );
}
