'use client';

import { styled } from 'styled-components';
import { Typography, message } from '@/components';
import { Upload as AntUpload, Form, Modal, FormInstance, Image } from 'antd';
import { Rule } from 'antd/es/form';
import type {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from 'antd/es/upload';
import {
  ImageToUrlStorage,
  beforeUpload,
  getBase64,
} from '@/utils/file/fileUpload';

import { useEffect, useState } from 'react';
import { UploadRequestOption } from 'rc-upload/lib/interface';
import {
  SignedUrlRead,
  useSignedUrlDeleteMutation,
  useSignedUrlWriteMutation,
} from '@/graphql/generated';

const StyledFormItem = styled(Form.Item)`
  margin: 0 !important;
`;

const StyledDragger = styled(AntUpload.Dragger)`
  .ant-upload {
    height: 188px !important;
  }
  .ant-upload-drag {
    border-width: 1px !important;
    border-color: #dedede !important;
    border-radius: 14px !important;
    border-style: solid !important;
  }
  .ant-upload-list {
    /* background-color: blue !important; */
    div {
      .ant-upload-list-item {
        margin-top: 0px !important;
        padding: 10px 16px !important;
      }
    }
  }
`;

interface Props extends UploadProps {
  form: FormInstance;
  field?: string;
  label?: string;
  required?: boolean;
  rules?: Rule[];
  help?: string;
  loading?: boolean;
  setLoading: (loading: boolean) => void;
}

export const FileUpload = ({
  form,
  field,
  label,
  required = false,
  help,
  accept,
  // className,
  loading,
  setLoading,
  ..._props
}: Props) => {
  const fieldKey = field;

  // const [loading, setLoading] = useState(false);

  const [onSignedUrlWriteMutation] = useSignedUrlWriteMutation();
  const [onSignedUrlDeleteMutation] = useSignedUrlDeleteMutation();

  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string | null>(null);

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleCancel = () => setPreviewOpen(false);

  const customRequest = async (options: UploadRequestOption) => {
    const { file: _file, onSuccess: _onSuccess } = options;
    const file = _file as RcFile;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSuccess = _onSuccess as any;

    const folder = 'post/file';

    const resultSignedUrls = await onSignedUrlWriteMutation({
      variables: {
        input: {
          folder: folder,
          name: file.name,
          contentType: String(file.type),
          fileSize: String(file.size),
        },
      },
    });
    const signedUrls = resultSignedUrls.data?.signedUrlWrite;

    try {
      const _signedUrl = signedUrls && signedUrls.native;
      if (_signedUrl) {
        await ImageToUrlStorage({
          file: file,
          url: _signedUrl,
          name: file.name,
          type: String(file.type),
        });
      }
      if (signedUrls?.tempFile?.id && signedUrls?.tempFile?.name) {
        onSuccess(true, {
          ...file,
          uid: signedUrls.tempFile.id,
          name: signedUrls.tempFile.name,
          fileSize: file.size,
        });
      } else onSuccess(true, file);
    } catch (error) {
      console.log('customRequest === error', error);
    }
  };

  const handleChange: UploadProps['onChange'] = async (
    info: UploadChangeParam<UploadFile>,
  ) => {
    setPreviewOpen(false);
    setPreviewImage(null);
    setPreviewTitle(null);
    if (info.file.status === 'uploading') {
      setLoading(true);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} アップロードされました`);
      const ids = info.fileList.map((e) => ({
        id: e?.xhr?.uid || e?.uid,
        name: e?.xhr?.name || e?.name,
        fileSize: e?.xhr?.fileSize || e?.size,
      }));
      form.setFieldsValue({ [`${fieldKey}`]: ids });
      setLoading(false);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
      const ids = info.fileList
        .filter((f) => f.uid !== info.file.uid)
        .map((e) => ({
          id: e?.xhr.uid || e?.uid,
          name: e?.xhr.name || e?.name,
          fileSize: e?.xhr?.fileSize || e?.size,
        }));
      form.setFieldsValue({ [`${fieldKey}`]: ids });
      setLoading(false);
    } else if (info.file.status === 'removed') {
      const fileInfos = info.fileList
        .filter((f) => f.uid !== info.file.uid)
        .map((e) => ({
          id: e?.xhr.uid || e?.uid,
          name: e?.xhr.name || e?.name,
          fileSize: e?.xhr?.fileSize || e?.size,
        }));
      form.setFieldsValue({ [`${fieldKey}`]: fileInfos });

      onSignedUrlDeleteMutation({
        variables: { id: info.file.xhr?.uid || info.file.uid },
      });
      setLoading(false);
    }
    setFileList(info.fileList);
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1),
    );
  };

  const props: UploadProps = {
    ..._props,
    multiple: true,
    disabled: loading,
    maxCount: 5,
    fileList: fileList,
    customRequest: (option) => customRequest(option),
    showUploadList: {
      showRemoveIcon: true,
      showPreviewIcon: true,
    },
    beforeUpload: (file) => beforeUpload(file, 'FILE'),
    onChange: handleChange,
    onPreview: handlePreview,
    accept: accept,
  };

  useEffect(() => {
    const files: SignedUrlRead[] = form.getFieldValue(fieldKey);
    if (files && files.length > 0) {
      const _files = files.map((file) => ({
        uid: file?.id as string,
        name: file?.name as string,
        xhr: {
          uid: file?.id as string,
          name: file?.name as string,
          fileSize: file?.fileSize as string,
        },
      }));
      setFileList(_files);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.getFieldValue(fieldKey)]);

  return (
    <div className="flex flex-col gap-tiny">
      {label && (
        <Typography className="text-primary" weight="medium">
          {label}
          {required && (
            <Typography className="text-[#ff4949] " weight="medium">
              {' *'}
            </Typography>
          )}
        </Typography>
      )}
      <StyledFormItem required={required} name={field}>
        <StyledDragger {...props}>
          <div className="flex flex-col items-center">
            <Image
              alt="no-documents"
              src="/assets/images/empty/no-documents.png"
              className="w-[154px] h-[124px]"
              preview={false}
            />
            <Typography base="Subtitle2" weight="bold">
              参考資料をアップロード
            </Typography>
          </div>
        </StyledDragger>
      </StyledFormItem>
      {help && (
        <Typography className="text-secondary" weight="medium" base="Caption">
          {`${help}`}
        </Typography>
      )}
      {previewImage && (
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="upload preview" src={previewImage} className="ww-100" />
        </Modal>
      )}
    </div>
  );
};
