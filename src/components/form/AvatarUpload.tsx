'use client';

import { ReactNode, useState } from 'react';
import { styled } from 'styled-components';
import { ButtonIcon, Typography } from '@/components';
import { Upload, Form, Modal, message, FormInstance, Spin } from 'antd';
import { Rule } from 'antd/es/form';
import type {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from 'antd/es/upload';
import {
  ImageSizeType,
  ImageToUrlStorage,
  ImageToUrlStorageResized,
  beforeUpload,
  getBase64,
  imageSizes,
} from '@/utils/file/fileUpload';

import ImgCrop from 'antd-img-crop';

import { UploadRequestOption } from 'rc-upload/lib/interface';
import { IoCameraOutline, IoRemoveOutline } from 'react-icons/io5';
import {
  FileSizeEnum,
  useSignedUrlDeleteMutation,
  useSignedUrlWriteMutation,
} from '@/graphql/generated';
import { sourceFile } from '@/utils/file/sourceFile';

const StyledUpload = styled.div`
  .ant-upload-wrapper {
    .ant-upload-select {
      margin: 0px !important;
      img {
        position: static;
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .default-icon {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .ant-upload-picture-card-wrapper .ant-upload-select img {
    border-radius: 8px !important;
  }

  .ant-upload-picture-circle-wrapper .ant-upload-select img {
    border-radius: 50%;
  }
  .ant-upload-wrapper {
    &.large {
      .ant-upload-select {
        width: 84px !important;
        height: 84px !important;
      }
    }
    &.medium {
      .ant-upload-select {
        width: 64px !important;
        height: 64px !important;
      }
    }
    &.small {
      .ant-upload-select {
        width: 40px !important;
        height: 40px !important;
      }
    }
    &.mini {
      .ant-upload-select {
        width: 24px !important;
        height: 24px !important;
      }
    }
  }
`;

// large - 84
// medium - 64
// small - 40
// mini - 24

interface Props extends UploadProps {
  form: FormInstance;
  field?: string;
  label?: string;
  folder?: string;
  required?: boolean;
  isCrop?: boolean;
  rules?: Rule[];
  help?: string;
  shape?: 'circle' | 'square';
  size?: 'large' | 'medium' | 'small' | 'mini';
  defaultIcon?: ReactNode;
  loading?: boolean;
  setLoading: (loading: boolean) => void;
}

export const AvatarUpload = ({
  form,
  label,
  field,
  folder = 'other',
  required = false,
  rules,
  isCrop = false,
  help,
  shape = 'circle',
  size = 'large',
  defaultIcon,
  loading,
  setLoading,
}: Props) => {
  const fieldKey = field;

  // const [loading, setLoading] = useState<boolean>(loadingThumbnail || false);

  const [onSignedUrlWriteMutation] = useSignedUrlWriteMutation();
  const [onSignedUrlDeleteMutation] = useSignedUrlDeleteMutation();

  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string | null>(null);

  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      url: form.getFieldValue(field),
      name: 'Initial Image',
      uid: form.getFieldValue(field),
    },
  ]);

  const handleCancel = () => setPreviewOpen(false);

  const customRequest = async (options: UploadRequestOption) => {
    const { file: _file, onSuccess: _onSuccess } = options;
    const file = _file as RcFile;

    console.log('customRequest', file);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSuccess = _onSuccess as any;

    const resultSignedUrls = await onSignedUrlWriteMutation({
      variables: {
        input: {
          folder: folder,
          name: file.name,
          contentType: String(file.type),
        },
      },
    });
    const signedUrls = resultSignedUrls.data?.signedUrlWrite;

    try {
      for (const [sizeName, dimensions] of Object.entries(imageSizes)) {
        const _sizeName = sizeName as FileSizeEnum;
        const _signedUrl = signedUrls && signedUrls[_sizeName];
        if (_signedUrl) {
          if (dimensions) {
            await ImageToUrlStorageResized({
              file: file,
              size: dimensions as ImageSizeType,
              url: _signedUrl,
              name: file.name,
              type: String(file.type),
            });
          } else
            await ImageToUrlStorage({
              file: file,
              url: _signedUrl,
              name: file.name,
              type: String(file.type),
            });
        }
      }
      // console.log('size = ', size);
      form.setFieldsValue({
        [`${fieldKey}`]: `${folder}/${signedUrls?.id}${signedUrls?.tempFile?.extname}`,
      });
      if (signedUrls?.tempFile?.id && signedUrls?.tempFile?.name) {
        onSuccess(true, {
          ...file,
          uid: signedUrls.tempFile.id,
          name: signedUrls.tempFile.name,
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
      if (!info.file?.url && !info.file.preview) {
        info.file.preview = await getBase64(info.file.originFileObj as RcFile);
        setPreviewImage(info.file.url || (info.file.preview as string));
      }
      setLoading(false);
    } else if (info.file.status === 'error') {
      setPreviewImage(null);
      message.error(`${info.file.name} file upload failed.`);
      setLoading(false);
    } else if (info.file.status === 'removed') {
      setPreviewImage(null);
      console.log('info.file', info.file);
      onSignedUrlDeleteMutation({
        variables: { id: info.file.xhr?.uid || info.file.uid },
      });
      form.setFieldsValue({
        [`${fieldKey}`]: null,
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

  return (
    <div className="flex flex-col gap-tiny" lang="ja">
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

      <Form.Item
        shouldUpdate
        required={required}
        rules={rules}
        className="mb-none"
      >
        {({ getFieldValue }) => {
          const _image = getFieldValue(fieldKey);
          const _url = sourceFile({
            size: FileSizeEnum.MEDIUM,
            fileKey: _image,
          })?.thumb;
          return (
            <Form.Item name={field} rules={rules} className=" mb-none">
              {isCrop ? (
                <StyledUpload>
                  <ImgCrop
                    modalOk="完了"
                    modalCancel=""
                    modalClassName="[&_.ant-btn-default]:hidden"
                    modalTitle="プロフィール画像設定"
                    modalProps={{
                      okButtonProps: {
                        style: {
                          color: 'rgb(31 41 55)',
                        },
                      },
                    }}
                    rotationSlider
                  >
                    <Upload
                      listType={
                        shape === 'circle' ? 'picture-circle' : 'picture-card'
                      }
                      className={`${size}`}
                      maxCount={1}
                      fileList={fileList}
                      customRequest={(option) => customRequest(option)}
                      showUploadList={false}
                      beforeUpload={(file) => beforeUpload(file, null)}
                      onChange={handleChange}
                      onPreview={handlePreview}
                      disabled={loading}
                      accept=".png, .jpg, .jpeg"
                    >
                      {loading ? (
                        <div className="w-[100%] text-center h-[100%] flex justify-center">
                          <Spin className="my-auto" size="small" />
                        </div>
                      ) : previewImage || _url ? (
                        <>
                          <img
                            alt="upload preview"
                            src={previewImage || _url || ''}
                          />
                          <ButtonIcon
                            className="w-[25px] h-[25px] rounded-md bg-error absolute bottom-none right-[0]"
                            onClick={() => {
                              setLoading(true);
                              const file = fileList?.[0];
                              if (file.uid) {
                                handleChange({
                                  file: { ...file, status: 'removed' },
                                  fileList: [],
                                });
                              }
                            }}
                            icon={
                              <IoRemoveOutline className=" h-xs w-xs text-white" />
                            }
                          />
                        </>
                      ) : (
                        <>
                          {defaultIcon && (
                            <div className="default-icon">{defaultIcon}</div>
                          )}
                          <ButtonIcon
                            className="w-[25px] h-[25px] rounded-md bg-neutral-800 absolute bottom-none right-[0]"
                            icon={
                              <IoCameraOutline className=" h-xs w-xs text-white" />
                            }
                          />
                        </>
                      )}
                    </Upload>
                  </ImgCrop>
                </StyledUpload>
              ) : (
                <StyledUpload>
                  <Upload
                    listType={
                      shape === 'circle' ? 'picture-circle' : 'picture-card'
                    }
                    className={`${size}`}
                    maxCount={1}
                    fileList={fileList}
                    customRequest={(option) => customRequest(option)}
                    showUploadList={false}
                    beforeUpload={(file) => beforeUpload(file, null)}
                    onChange={handleChange}
                    onPreview={handlePreview}
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="w-[100%] text-center h-[100%] flex justify-center">
                        <Spin className="my-auto" size="small" />
                      </div>
                    ) : previewImage || _url ? (
                      <>
                        <img
                          alt="upload preview"
                          src={previewImage || _url || ''}
                        />
                        <ButtonIcon
                          className="w-[25px] h-[25px] rounded-md bg-error absolute bottom-none right-[0]"
                          onClick={() => {
                            setLoading(true);
                            const file = fileList?.[0];
                            if (file.uid)
                              handleChange({
                                file: { ...file, status: 'removed' },
                                fileList: [],
                              });
                          }}
                          icon={
                            <IoRemoveOutline className=" h-xs w-xs text-white" />
                          }
                        />
                      </>
                    ) : (
                      <>
                        {defaultIcon && (
                          <div className="default-icon">{defaultIcon}</div>
                        )}
                        <ButtonIcon
                          className="w-[25px] h-[25px] rounded-md bg-neutral-800 absolute bottom-none right-[0]"
                          icon={
                            <IoCameraOutline className=" h-xs w-xs text-white" />
                          }
                        />
                      </>
                    )}
                  </Upload>
                </StyledUpload>
              )}
            </Form.Item>
          );
        }}
      </Form.Item>

      {help && (
        <Typography className="text-secondary" weight="medium" base="Caption">
          {`${help}`}
        </Typography>
      )}
      {previewOpen && previewImage && (
        <Modal
          okButtonProps={{
            style: {
              background: 'black',
              color: '#fff',
            },
          }}
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
