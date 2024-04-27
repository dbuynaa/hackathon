import { PasswordInput, Button, Typography, alertModal } from '@/components';
import { AuthType, forgotTypeProps } from '../type';
import { Form } from 'antd';
import { Rule } from 'antd/es/form';
import { Yup } from '@/lib/yup';
import { useResetPasswordMutation } from '@/graphql/generated';

type ForgotPasswordInput = {
  password: string;
  confirmPassword: string;
};

export function NewPassword({ setAuthType, email }: forgotTypeProps) {
  const [form] = Form.useForm();

  const yupSync: Rule = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async validator({ field }: any, value) {
      await Yup.changePasswordNew.validateSyncAt(field, { [field]: value });
    },
  };

  const [onForgotPassword, { loading }] = useResetPasswordMutation({
    onCompleted: () => {
      setAuthType(AuthType.Complete);
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
    if (values.confirmPassword && email) {
      onForgotPassword({
        variables: {
          email,
          newPassword: values.confirmPassword,
        },
      });
    }
  };

  return (
    <Form
      form={form}
      name="Confirmation"
      layout="vertical"
      onFinish={onFinish}
      autoComplete="on"
      className="flex flex-col gap-xxl p-md "
      scrollToFirstError
    >
      <div className="flex flex-col gap-lg">
        <Typography weight="bold" base="H5" className="text-primary">
          パスワード変更
        </Typography>

        <div className="flex flex-col gap-md">
          <PasswordInput
            field="password"
            rules={[yupSync]}
            placeholder="新しいパスワード"
          />
          <PasswordInput
            field="confirmPassword"
            rules={[yupSync]}
            placeholder="新しいパスワード再入力"
          />
        </div>
      </div>
      <Button
        type="primary"
        className="w-full "
        htmlType="submit"
        disabled={loading}
        loading={loading}
      >
        変更する
      </Button>
    </Form>
  );
}
