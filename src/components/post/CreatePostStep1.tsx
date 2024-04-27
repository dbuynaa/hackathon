'use client';

import {
  Typography,
  TextInput,
  SelectInput,
  CoverUpload,
  FileUpload,
  TextAreaInput,
  Button,
  RadioGroupInput,
  FormItem,
  AvatarUpload,
} from '@/components';
import { Col, DatePicker, Form, Radio, Row } from 'antd';
import { Rule } from 'antd/es/form';
import { IoCaretDownSharp } from 'react-icons/io5';
import { enums } from '@/utils/enumUtils';
import {
  Category,
  PostCreateInput,
  PostTypeEnum,
  useSignedUrlWriteMutation,
} from '@/graphql/generated';
import { usePathname } from 'next/navigation';
import { FormInstance } from 'antd/lib';
import { useEffect, useState } from 'react';
import dayjs, { locale as dayjsLocale } from 'dayjs';
import { generateVideoThumbnails } from '@/utils/file/videoDuration';
import { sourceFile } from '@/utils/file/sourceFile';
import Image from 'next/image';
import SkeletonImage from 'antd/es/skeleton/Image';
import {
  ImageSizeType,
  ImageToUrlStorage,
  ImageToUrlStorageResized,
  imageSizes,
} from '@/utils/file/fileUpload';
import { orderBy } from 'lodash';
import 'dayjs/locale/ja';
dayjsLocale('ja');

type Props = {
  form: FormInstance<PostCreateInput>;
  yupSync: Rule;
  categories?: Category[];
  type?: PostTypeEnum;
  onDraftPress?: (values: PostCreateInput) => void;
  setType?: (type: PostTypeEnum | null) => void;
  uploading?: boolean;
  setUploading: (uploading: boolean) => void;
};

export function CreatePostStep1({
  form,
  yupSync,
  categories,
  type,
  uploading,
  setUploading,
  onDraftPress,
  setType,
}: Props) {
  const pathName = usePathname();
  const isAdmin = pathName.startsWith('/admin');
  const [onSignedUrlWriteMutation] = useSignedUrlWriteMutation();

  const [open, setOpen] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [thumbnails, setThumbnails] = useState<HTMLCanvasElement[]>([]);
  const [selectedThumbnail, setSelectedThumbnail] = useState(
    form.getFieldValue('thumbnail') || '',
  );
  const [thumbnailLoading, setThumbnailLoading] = useState(false);
  const [thumbnailsLoading, setThumbnailsLoading] = useState(false);
  const file: string = form.getFieldValue('cover');

  useEffect(() => {
    if (!file || type !== PostTypeEnum.VIDEO) return;

    const videoUrl = sourceFile({
      fileKey: file,
      type: 'VIDEO',
    })?.url?.toString();
    if (!videoUrl) {
      console.error('Invalid video URL');
      setThumbnailsLoading(false);
      return;
    }
    setThumbnailsLoading(true);
    generateVideoThumbnails(videoUrl, 4)
      .then((res) => {
        setThumbnails(res);
      })
      .catch((error) => {
        console.error('Error generating thumbnails:', error);
      })
      .finally(() => {
        setThumbnailsLoading(false);
      });
  }, [file, form, type]);

  const handleSelectThumbnail = async (canvas: HTMLCanvasElement) => {
    const canvasToBlob = (canvas: HTMLCanvasElement) => {
      return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to convert canvas to blob'));
          }
        }, 'image/jpeg'); // Assuming you want a JPEG image
      });
    };

    const blobToFile = (blob: Blob, fileName: string): File => {
      return new File([blob], fileName, {
        type: blob.type,
        lastModified: Date.now(),
      });
    };
    setThumbnailLoading(true);

    try {
      const blob = await canvasToBlob(canvas);
      const file = blobToFile(blob as Blob, 'thumbnail.jpg'); // Example file name

      const resultSignedUrls = await onSignedUrlWriteMutation({
        variables: {
          input: {
            folder: 'other',
            name: file.name,
            contentType: file.type,
          },
        },
      });

      const signedUrls = resultSignedUrls.data?.signedUrlWrite;

      if (signedUrls) {
        for (const [sizeName, dimensions] of Object.entries(imageSizes)) {
          const _sizeName = sizeName as keyof typeof imageSizes;
          const _signedUrl = signedUrls[_sizeName];
          if (_signedUrl) {
            if (dimensions) {
              await ImageToUrlStorageResized({
                file: file,
                size: dimensions as ImageSizeType,
                url: _signedUrl,
                name: file.name,
                type: file.type,
              });
            } else {
              await ImageToUrlStorage({
                file: file,
                url: _signedUrl,
                name: file.name,
                type: file.type,
              });
            }
          }
        }
        setThumbnailLoading(false);

        form.setFieldValue(
          'thumbnail',
          `other/${signedUrls.id}${signedUrls.tempFile?.extname}`,
        );
        setSelectedThumbnail(
          `other/${signedUrls.id}${signedUrls.tempFile?.extname}`,
        );
      }
    } catch (error) {
      console.error('Error processing thumbnail:', error);
    }
  };
  function displayThumbnail(thumbnail: HTMLCanvasElement): string {
    const url = thumbnail.toDataURL();
    const thumbnailUrl =
      sourceFile({
        fileKey: url,
        type: 'IMAGE',
      })?.url || '';

    return thumbnailUrl;
  }

  return (
    <div className="flex flex-col gap-lg">
      <CoverUpload
        loading={uploading}
        setLoading={setUploading}
        form={form}
        field="cover"
        required
        fileType={type}
        setType={setType}
      />
      {/* <div className="flex items-center justify-center flex-col gap-none">
        <Typography className="text-secondary text-center">
          動画ファイル形式がアップロード可能な形式になっているか、ご確認ください。
        </Typography>
        <Typography className="text-secondary text-center">
          可能なファイル形式は「mp4」です。
        </Typography>
      </div> */}
      <Typography className="text-secondary">
        動画ファイル形式がアップロード可能な形式になっているか、ご確認ください。
        <br />
        可能なファイル形式は「mp4」です。
      </Typography>

      {type == PostTypeEnum.VIDEO && (
        <Radio.Group
          value={selectedThumbnail}
          onChange={(e) => {
            handleSelectThumbnail(e.target.value);
          }}
        >
          <Row gutter={[16, 16]}>
            <AvatarUpload
              field="thumbnail"
              shape="square"
              form={form}
              loading={thumbnailLoading}
              setLoading={setThumbnailLoading}
              isCrop={true}
              className="!h-[80px] w-full"
            />

            {thumbnails.length === 0
              ? [1, 2, 3, 4].map((item) => (
                  <Col span={4} key={item}>
                    <SkeletonImage
                      active={thumbnailsLoading}
                      className="w-full h-[80px]"
                    />
                  </Col>
                ))
              : thumbnails.map((item, index) => (
                  <Col span={4} key={index}>
                    <Radio.Button
                      className="w-fit h-fit z-10 p-none border-none"
                      value={item}
                    >
                      <Image
                        width={300}
                        height={300}
                        itemType="file"
                        src={displayThumbnail(item)}
                        alt="thumbnail"
                        className={`w-full h-[80px] p-none m-none rounded-sm object-cover ${
                          selectedThumbnail === item ? 'ring-2 ring-brand' : ''
                        }`}
                      />
                    </Radio.Button>
                  </Col>
                ))}
          </Row>
        </Radio.Group>
      )}
      <TextInput
        label="タイトル"
        field="title"
        required
        rules={[yupSync]}
        placeholder="記事タイトル"
      />
      <TextAreaInput
        form={form}
        label="記事"
        field="content"
        required
        rules={[yupSync]}
        placeholder="記事内容"
        className="xs:h-[480px]"
      />

      <div
        className={`flex flex-row border-b-2 border-brand pb-xs2 ${
          isAdmin ? '' : 'sm:mt-[0] tiny:mt-lg mt-xxl'
        }`}
      >
        <Typography
          base="Subtitle"
          weight="bold"
          className="text-primary mt-xs2"
        >
          参考資料をダウンロード
        </Typography>
      </div>
      <FileUpload
        loading={uploading}
        setLoading={setUploading}
        form={form}
        field="files"
        accept=".pdf"
      />
      <div className="flex flex-row border-b-2 border-brand pb-xs2">
        <Typography base="H5" weight="bold" className="text-primary">
          記事投稿設定
        </Typography>
      </div>
      <div className="flex flex-col gap-xs">
        <RadioGroupInput
          className="flex gap-sm"
          field="privacy"
          rules={[yupSync]}
          label="プライバシー設定"
          required
          items={enums.postPrivacy.list.map((item) => ({
            value: item.key,
            label: item.value,
          }))}
        />
        <Typography className="text-secondary">
          ※「全体に公開」を選択すると全てのユーザーが閲覧できます。
          <br />
          ※「スタッフのみ」を選択すると、法人に所属するスタッフのみが閲覧できます。
        </Typography>
      </div>
      <div className="grid grid-cols-2 gap-sm">
        <div className="col-span-2 sm:col-span-1">
          <SelectInput
            field="parent"
            rules={[yupSync]}
            label="カテゴリーを選択"
            placeholder="選択"
            required
            options={categories
              ?.filter((e) => e?.code !== '1001')
              ?.map((item) => ({
                value: item.code,
                label: item.name,
              }))}
            onChange={() => {
              form.setFieldValue('children', null);
            }}
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <Form.Item shouldUpdate>
            {({ getFieldValue }) => {
              const _parent = getFieldValue('parent');
              if (_parent) {
                const childrens = categories
                  ?.filter(
                    (e) =>
                      e?.code !== '1001' &&
                      e?.code !== '1021' &&
                      e?.code !== '1023',
                  )
                  ?.find((item) => item.code == _parent)?.children;

                const orderList = orderBy(childrens, 'code', 'asc');

                if (orderList && orderList.length > 0) {
                  return (
                    <SelectInput
                      field="children"
                      rules={[yupSync]}
                      label="サブカテゴリーを選択"
                      placeholder="選択"
                      required
                      options={orderList?.map((item) => ({
                        value: item?.code,
                        label: item?.name,
                      }))}
                    />
                  );
                } else {
                  return null;
                }
              } else {
                return null;
              }
            }}
          </Form.Item>
        </div>
      </div>

      <FormItem
        field="publishDate"
        label="投稿時間を設定"
        required
        rules={[yupSync]}
      >
        <DatePicker
          showTime
          open={open}
          onOpenChange={setOpen}
          disabledDate={(day) => day && day <= dayjs()}
          onChange={(e) => {
            setOpen(false);
            form.setFieldValue('publishDate', e);
          }}
          popupClassName="rounded-md [&_.ant-btn-primary]:!text-primary [&_.ant-picker-panel-container]:left-auto [&_.ant-picker-panel-container]:w-[300px] [&_.ant-picker-panel-container]:overflow-x-scroll [&_.ant-picker-panel-container]:tiny:w-[350px] [&_.ant-picker-panel-container]:xs:w-full"
          format="YYYY/MM/DD HH:mm"
          placeholder="選択"
          className="rounded-md w-full "
          suffixIcon={<IoCaretDownSharp className="text-primary" />}
        />
      </FormItem>
      <div className="flex flex-row gap-sm justify-end pt-md border-t-2 border-t-brand">
        {onDraftPress && (
          <Button
            {...form}
            className="px-md"
            onClick={() => onDraftPress(form.getFieldsValue())}
          >
            下書き
          </Button>
        )}
        <Button
          {...form}
          disabled={uploading}
          loading={uploading}
          type="primary"
          className="px-md"
          htmlType="submit"
        >
          プレビュー
        </Button>
      </div>
    </div>
  );
}
