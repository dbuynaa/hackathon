import { Form, message } from "antd";
import { AuthType, Props } from "../type";
import {
  CheckBoxInput,
  PasswordInput,
  TextInput,
  Button,
  Typography,
} from "@/components";
import { Yup } from "@/lib/yup";

import { IoPersonOutline } from "react-icons/io5";
import { Rule } from "antd/es/form";
import { getCsrfToken, signIn } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { LoginInput } from "@/graphql/generated";
import { useAlertStore } from "@/context/AlertModalProvider";

export function Login(props: Props) {
  const { setAuthType } = props;

  const [form] = Form.useForm();

  const { setAlert } = useAlertStore();

  const yupSync: Rule = {
    async validator({ field }: any, value) {
      await Yup.loginEmail.validateSyncAt(field, { [field]: value });
    },
  };

  const onFinish = async (values: LoginInput) => {
    const credentials = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (credentials?.error) {
      setAlert({
        base: "error",
        open: true,
        title: "Алдаа шалгах",
        description: credentials.error,
        cancelText: "Буцах",
      });
    } else {
      window.location?.reload();
      message.success("Амжилттай нэвтэрлээ");
    }
  };

  return (
    <div>
      <Form
        form={form}
        name="LoginEmail"
        layout="vertical"
        initialValues={{ email: null, password: null }}
        onFinish={onFinish}
        onFinishFailed={(errorInfo) => {
          console.log("Failed:", errorInfo);
        }}
        autoComplete="on"
        className="flex flex-col gap-xxl p-none sm:p-md mt-lg sm:mt-none"
        scrollToFirstError
      >
        <div className="flex flex-col gap-md sm:gap-lg">
          <div className="flex flex-col gap-xs2">
            <Typography weight="bold" base="H5" className=" text-primary">
              Нэвтрэх
            </Typography>
            <Typography className="text-secondary">
              Бүртгүүлээгүй 3-дагч этгээд ашиглахыг хориглоно.  </Typography>
          </div>

          <div className="flex flex-col gap-md">
            <TextInput
              field="email"
              rules={[yupSync]}
              placeholder={"И-Мэйл"}
              className="border-none  bg-surface-secondary [&>input]:bg-surface-secondary rounded-md "
              prefix={<IoPersonOutline />}
            />

            <PasswordInput
              field="password"
              required
              rules={[yupSync]}
              placeholder="Нууц үг"
              className="border-none  bg-surface-secondary [&>input]:bg-surface-secondary "
            />
          </div>
          <Button
            type="text"
            className="flex self-end font-medium p-[0]"
            onClick={() => setAuthType(AuthType.Forget)}
          >
            Нууц үгээ мартсан?
          </Button>
        </div>
        <div className="flex flex-col gap-md">
          <CheckBoxInput field="agree" rules={[yupSync]}>
            <a href="/privacy">プライバシーポリシー・Үйлилгээний </a>  нөхцөл
          </CheckBoxInput>
          <Button htmlType="submit" type="primary" className="w-full ">
            ログイン
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
