'use client';

import { styled } from 'styled-components';
import { ButtonIcon, Typography, VideoPlayerAdd, message } from '@/components';
import {
  Upload as AntUpload,
  Form,
  Modal,
  FormInstance,
  Image,
  Spin,
} from 'antd';
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
  FileSizeEnum,
} from '@/utils/file/fileUpload';

import { useState } from 'react';
import { UploadRequestOption } from 'rc-upload/lib/interface';
import {
  PostTypeEnum,
  useSignedUrlDeleteMutation,
  useSignedUrlWriteMutation,
} from '@/graphql/generated';
import { sourceFile } from '@/utils/file/sourceFile';
import { IoClose } from 'react-icons/io5';

const StyledDragger = styled(AntUpload.Dragger)`
  .ant-upload {
    height: 318px !important;
    padding: 0px !important;
    border-radius: 14px !important;
    border-width: 0 !important;
  }
`;

interface Props extends UploadProps {
  form: FormInstance;
  field?: string;
  label?: string;
  required?: boolean;
  help?: string;
  fileType?: PostTypeEnum;
  loading?: boolean;
  setLoading: (loading: boolean) => void;
  setType?: (type: PostTypeEnum | null) => void;
}

function UploadComponent() {
  return (
    <div className="flex flex-col items-center w-full h-[318px] rounded-sm shadow-sm">
      <Image
        alt="no-mages"
        src={'/assets/images/empty/no-mages.png'}
        className="w-[250px] h-[200px]"
        preview={false}
      />
      <Typography base="Subtitle2" weight="bold">
        画像・動画アップロード
      </Typography>
    </div>
  );
}

export const CoverUpload = ({
  form,
  field,
  label,
  required = false,
  help,
  accept,
  fileType,
  loading,
  setLoading,
  setType,
}: Props) => {
  const fieldKey = field;

  const [getFileType, setFileType] = useState<PostTypeEnum | null>(
    fileType || null,
  );

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSuccess = _onSuccess as any;

    const _type = file.type.startsWith('video')
      ? PostTypeEnum.VIDEO
      : file.type.startsWith('image')
      ? PostTypeEnum.IMAGE
      : null;
    setFileType(_type);
    if (setType) setType(_type);

    const folder = file.type.startsWith('video') ? 'post/video' : 'post/image';

    try {
      let signedUrls;
      if (file.type.startsWith('image')) {
        const resultSignedUrls = await onSignedUrlWriteMutation({
          variables: {
            input: {
              folder: folder,
              name: file.name,
              contentType: String(file.type),
            },
          },
        });
        signedUrls = resultSignedUrls.data?.signedUrlWrite;
        for (const [sizeName, dimensions] of Object.entries(imageSizes)) {
          const _sizeName = sizeName as FileSizeEnum;
          const _signedUrl = signedUrls && signedUrls[_sizeName];
          if (_signedUrl) {
            if (dimensions && file?.type.startsWith('image')) {
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
      } else {
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
        signedUrls = resultSignedUrls.data?.signedUrlWrite;
        if (signedUrls && signedUrls.native) {
          await ImageToUrlStorage({
            file: file,
            url: signedUrls.native,
            name: file.name,
            type: String(file.type),
          });
        }
      }
      if (signedUrls?.tempFile?.id && signedUrls?.tempFile?.name) {
        onSuccess(true, {
          ...file,
          uid: signedUrls.tempFile.id,
          name: signedUrls.tempFile.name,
          url: `${folder}/${signedUrls?.id}${signedUrls?.tempFile?.extname}`,
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
      message.success(`${info.file.name} アップロードされました！`);
      if (!info.file?.url && !info.file.preview) {
        if (getFileType === 'IMAGE') {
          info.file.preview = await getBase64(
            info.file.originFileObj as RcFile,
          );
          setPreviewImage(info.file.url || (info.file.preview as string));
        } else {
          info.file.url = URL.createObjectURL(
            info.file.originFileObj as RcFile,
          );
          setPreviewImage(info.file.url || (info.file.preview as string));
        }
      }
      console.log('type', getFileType);
      if (info.file.xhr.url) {
        form.setFieldsValue({
          [`${fieldKey}`]: info.file.xhr.url,
          type: getFileType,
        });
        if (setType && getFileType) setType(getFileType);
      }
      setLoading(false);
    } else if (info.file.status === 'error') {
      setPreviewImage(null);
      message.error(`${info.file.name} file upload failed.`);
      setLoading(false);
    } else if (info.file.status === 'removed') {
      setPreviewImage(null);
      onSignedUrlDeleteMutation({
        variables: { id: info.file.xhr?.uid || info.file.uid },
      });
      form.setFieldsValue({
        [`${fieldKey}`]: null,
        type: null,
      });
      if (setType && getFileType) setType(null);
      setLoading(false);
    }
    setFileList(info.fileList);
  };

  const handlePreview = async (file: UploadFile) => {
    if (!previewImage) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj as RcFile);
      }
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1),
    );
  };

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
      <Form.Item
        shouldUpdate
        required={required}
        rules={[
          {
            required: required,
            message: '画像または動画をアップロードしてください',
          },
        ]}
        className="mb-none"
      >
        {({ getFieldValue }) => {
          const _cover = getFieldValue(field);
          const _url = sourceFile({
            fileKey: _cover,
            type: fileType === 'VIDEO' ? 'VIDEO' : 'IMAGE',
          })?.url;
          return (
            <Form.Item
              name={field}
              rules={[
                {
                  required: required,
                  message: '画像または動画をアップロードしてください',
                },
              ]}
              className=" mb-none"
            >
              <StyledDragger
                maxCount={1}
                fileList={fileList}
                customRequest={(option) => customRequest(option)}
                showUploadList={false}
                beforeUpload={(file) => beforeUpload(file, getFileType)}
                onChange={handleChange}
                onPreview={handlePreview}
                disabled={loading}
                accept={
                  accept
                    ? accept
                    : fileType === 'IMAGE'
                    ? '.png, .jpg, .jpeg'
                    : fileType === 'VIDEO'
                    ? '.mp4'
                    : ''
                }
              >
                {loading ? (
                  <div className="w-[100%] text-center h-[100%] flex justify-center">
                    <Spin className="my-auto" />
                  </div>
                ) : previewImage || _url ? (
                  <>
                    {getFileType !== PostTypeEnum.VIDEO ? (
                      <div
                        className="bg-cover bg-center w-full h-[318px] rounded-sm shadow-sm"
                        style={{
                          background: `url("${
                            previewImage || _url
                          }"), lightgray 50% / cover no-repeat`,
                        }}
                      >
                        <ButtonIcon
                          className=" absolute top-tiny right-tiny"
                          size="small"
                          type="text"
                          onClick={() => {
                            setLoading(true);
                            const file = fileList?.[0];
                            if (file.uid)
                              handleChange({
                                file: { ...file, status: 'removed' },
                                fileList: [],
                              });
                          }}
                          icon={<IoClose />}
                        />
                        {/* <ButtonIcon
                          className="w-[25px] h-[25px] rounded-md absolute top-xs right-xs"
                          color="error"
                          type="primary"
                          onClick={() => {
                            setLoading(true);
                            const file = fileList?.[0];
                            if (file.uid)
                              handleChange({
                                file: { ...file, status: 'removed' },
                                fileList: [],
                              });
                          }}
                          icon={<IoClose className=" h-xs w-xs text-white" />}
                        /> */}
                      </div>
                    ) : (
                      <div className="bg-cover bg-center w-full h-[318px] rounded-sm shadow-sm">
                        <VideoPlayerAdd
                          form={form}
                          url={previewImage || _url}
                        />
                        <ButtonIcon
                          className=" absolute top-tiny right-tiny"
                          size="small"
                          type="text"
                          onClick={() => {
                            setLoading(true);
                            const file = fileList?.[0];
                            if (file.uid)
                              handleChange({
                                file: { ...file, status: 'removed' },
                                fileList: [],
                              });
                          }}
                          icon={<IoClose />}
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <UploadComponent />
                )}
              </StyledDragger>
            </Form.Item>
          );
        }}
      </Form.Item>
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
