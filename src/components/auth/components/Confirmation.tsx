import { Button, Typography, Tag, alertModal } from '@/components';
import { AuthType, forgotTypeProps } from '../type';
import { Form } from 'antd';
import { Rule } from 'antd/es/form';

import Countdown, { CountdownRenderProps } from 'react-countdown';
import { useState } from 'react';
import { Yup } from '@/lib/yup';
//import icon
import { IoReload } from 'react-icons/io5';
import { ConfirmCodeInput } from './ConfirmCode';
import {
  useUserForgotPasswordConfirmationMutation,
  useUserForgotPasswordMutation,
} from '@/graphql/generated';

type ForgotPasswordInput = {
  code: string;
};

export function Confirmation({ setAuthType, email }: forgotTypeProps) {
  const [form] = Form.useForm();
  const [countdownKey, setCountdownKey] = useState(0);
  const [showResendButton, setShowResendButton] = useState(false);
  const yupSync: Rule = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async validator({ field }: any, value) {
      await Yup.confirmPasswordCode.validateSyncAt(field, { [field]: value });
    },
  };
  const onComplete = (value: string) => {
    form.setFieldValue('code', value);
  };

  const [onForgotPasswordResend, { loading: resendLoading }] =
    useUserForgotPasswordMutation({
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

  const [onForgotPasswordConfirmation, { loading }] =
    useUserForgotPasswordConfirmationMutation({
      onCompleted: () => {
        setAuthType(AuthType.NewPassword);
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
    if (values.code && email) {
      onForgotPasswordConfirmation({
        variables: {
          email: email,
          code: values.code,
        },
      });
    }
  };

  const onResendCode = () => {
    setShowResendButton(false);
    setCountdownKey(countdownKey + 1);
    if (email) {
      onForgotPasswordResend({
        variables: {
          email,
        },
      });
    }
    setTimeout(() => {
      setShowResendButton(false);
    }, 300000);
  };
  const renderer = ({ minutes, seconds, completed }: CountdownRenderProps) => {
    if (completed) {
      setShowResendButton(true);
      return <Typography>00:00</Typography>;
    } else if (minutes > 1) {
      return (
        <Typography>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </Typography>
      );
    } else {
      return <Typography>00:{String(seconds).padStart(2, '0')}</Typography>;
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
      <div className="flex flex-col gap-lg items-center">
        <div className="flex flex-col gap-xs2">
          <Typography weight="bold" base="H5">
            確認
          </Typography>
          <Typography className="text-secondary">
            ご登録されているメールアドレス宛に確認コードを送信しました。メールを確認の上、コードを入力してください。
          </Typography>
        </div>
        <Form.Item name={'code'} rules={[yupSync]} className="m-[0]">
          <ConfirmCodeInput
            onComplete={onComplete}
            type="number"
            key={countdownKey}
          />
        </Form.Item>

        {showResendButton && (
          <Button
            size="small"
            onClick={onResendCode}
            icon={<IoReload />}
            disabled={loading || resendLoading}
            loading={loading || resendLoading}
          >
            コードを再度送ります
          </Button>
        )}
        {!showResendButton && (
          <Tag size="large" color="mint">
            <Countdown
              date={Date.now() + 300000}
              renderer={renderer}
              key={countdownKey}
            />
          </Tag>
        )}
      </div>
      <Button
        type="primary"
        className="w-full px-md"
        htmlType="submit"
        disabled={loading || resendLoading}
        loading={loading || resendLoading}
      >
        確認
      </Button>
    </Form>
  );
}
