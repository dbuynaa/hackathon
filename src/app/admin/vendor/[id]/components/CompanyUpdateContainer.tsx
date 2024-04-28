"use client";

import {
  AvatarUpload,
  Button,
  SelectInput,
  TextInput,
  Typography,
  alertModal,
} from "@/components";
import {
  CompanyAdminQuery,
  CompanyUpdateInput,
  useCompanyUpdateMutation,
} from "@/graphql/generated";
import { IoCaretDownSharp, IoClose } from "react-icons/io5";
import { DatePicker, Form, Image } from "antd";
import { Rule } from "antd/es/form";
import { Yup } from "@/lib/yup";
import dayjs from "dayjs";
import { sourceFile } from "@/utils/file/sourceFile";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { NumberInput } from "@/components/form/NumberInput";
import {
  validateKatakanaFull,
  validatePhoneNumber,
} from "@/utils/form/validateFormat";
import { formMaskPhoneNumber } from "@/utils/form/maskFormat";

export function CompanyUpdateContainer({
  data,
  setEdit,
}: {
  data: CompanyAdminQuery["company"];
  setEdit: (_: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();
  const yupSync: Rule = ({ getFieldValue }) => ({
    async validator({ field }: any, value) {
      const [object, property] = field.split(".");
      const emailVal = getFieldValue("email");

      if (object && property) {
        await Yup.companyUpdate.validateSyncAt(
          field,
          {
            owner: { name: value, email: value, accessId: value },
          },
          {
            context: { email: emailVal },
          }
        );
      } else {
        await Yup.companyUpdate.validateSyncAt(field, { [field]: value });
      }
    },
  });
  const [onCompanyUpdateMutation] = useCompanyUpdateMutation({
    onCompleted: () => {
      alertModal.confirm({
        base: "success",
        title: "管理者が編集されました",
        okText: "管理者管理に戻る",
        onOk: () => {
          setEdit(false);
          router.refresh();
        },
      });
    },
    onError: (error) => {
      alertModal.confirm({
        base: "error",
        title: "エラーを確認してください",
        description: error.message,
        okText: "戻る",
      });
    },
  });
  const onFinish = (values: CompanyUpdateInput) => {
    if (data?.id)
      onCompanyUpdateMutation({
        variables: { id: data.id, input: values as CompanyUpdateInput },
      });
  };

  useEffect(() => {
    if (data?.id) {
      form.setFieldsValue({ ...data, endDate: dayjs(data?.endDate) });
    }
  }, [data?.id]);

  return (
    <Form
      form={form}
      name="companyEdit"
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={(errorInfo) => {
        console.log("Failed:", errorInfo);
      }}
      autoComplete="on"
      className="col-span-12 lg:col-span-4 flex flex-col gap-lg lg:border-r border-r-dark lg:pr-lg"
    >
      <div className="flex gap-md items-center" key={data?.id}>
        <AvatarUpload
          form={form}
          field="image"
          folder="company"
          shape="square"
          required
          loading={loading}
          setLoading={setLoading}
          rules={[yupSync]}
          isCrop={true}
          defaultIcon={
            <Image
              src={
                sourceFile({
                  fileKey: data?.image,
                })?.url
              }
              alt={
                sourceFile({
                  fileKey: data?.image,
                })?.name
              }
              preview={false}
              className="w-full h-full"
            />
          }
        />

        <div className="flex flex-col gap-xs">
          <Typography weight="bold" base="H5" className="text-primary">
            {data?.name}
          </Typography>
          <SelectInput
            field="status"
            rules={[yupSync]}
            className="w-fit h-[36px]"
            disabled
            options={enums.companyStatus.list.map((item) => ({
              value: item.key,
              label: item.value,
            }))}
            aria-readonly
            autoClearSearchValue
          />
        </div>
      </div>

      <Typography
        base="Subtitle"
        weight="bold"
        className="text-primary border-b-2 border-brand pb-xs2"
      >
        契約法人会員情報
      </Typography>

      <div className="flex flex-col gap-md">
        <TextInput
          label="法人名"
          field="name"
          rules={[yupSync]}
          allowClear={{
            clearIcon: (
              <IoClose className="w-[18px] h-[18px] text-neutral-500" />
            ),
          }}
        />
        <TextInput
          label="法人名 (フリガナ)"
          field="nameFurigana"
          rules={[validateKatakanaFull, yupSync]}
          allowClear={{
            clearIcon: (
              <IoClose className="w-[18px] h-[18px] text-neutral-500" />
            ),
          }}
          placeholder="ヒマワリヨウチエン"
        />

        <TextInput
          label=""
          required
          field="phoneNumber"
          inputMode="search"
          rules={[validatePhoneNumber, yupSync]}
          allowClear={{
            clearIcon: (
              <IoClose className="w-[18px] h-[18px] text-neutral-500" />
            ),
          }}
          normalize={(e) => formMaskPhoneNumber(e)}
          placeholder="03 1231 1234"
        />

        <div className="flex gap-sm ">
          <Form.Item
            name="endDate"
            label="Created Date"
            rules={[yupSync]}
            className="w-full m-[0] [&>.ant-form-item-row>.ant-form-item-label]:pb-tiny"
          >
            <DatePicker
              format="YYYY/MM/DD"
              placeholder="Created At"
              disabledDate={(day) => day.isBefore(dayjs())}
              className="rounded-md w-full"
              suffixIcon={<IoCaretDownSharp className="text-primary" />}
            />
          </Form.Item>
          <NumberInput
            type="number"
            label=" 利用人数上限"
            field="staffLimit"
            required
            rules={[yupSync]}
          />
        </div>
        <div className="flex gap-sm ">
          <NumberInput
            type="number"
            label="マネジャー人数 *"
            required
            field="managerLimit"
            rules={[yupSync]}
          />
          <TextInput
            label=" 担当者ID"
            required
            field={["owner", "accessId"]}
            rules={[yupSync]}
            allowClear={{
              clearIcon: (
                <IoClose className="w-[18px] h-[18px] text-neutral-500" />
              ),
            }}
          />
        </div>
        <div className="flex gap-sm ">
          <TextInput
            label=" 担当者名"
            required
            field={["owner", "name"]}
            rules={[yupSync]}
            allowClear={{
              clearIcon: (
                <IoClose className="w-[18px] h-[18px] text-neutral-500" />
              ),
            }}
          />
          <TextInput
            label="  担当者 メールアドレス"
            field={["owner", "email"]}
            rules={[yupSync]}
            allowClear={{
              clearIcon: (
                <IoClose className="w-[18px] h-[18px] text-neutral-500" />
              ),
            }}
          />
        </div>
      </div>
      <div className="flex gap-sm w-full pt-md border-t-2 border-t-brand">
        <Button
          className="w-full"
          loading={loading}
          disabled={loading}
          onClick={() => {
            setEdit(false);
          }}
        >
          キャンセル
        </Button>
        <Button type="primary" className="w-full" htmlType="submit">
          保存
        </Button>
      </div>
    </Form>
  );
}
