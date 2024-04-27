'use client';

import { App, Image, ModalFuncProps as AntModalFuncProps } from 'antd';

interface ModalFuncProps extends AntModalFuncProps {
  base?: 'success' | 'error' | 'warning';
  description?: string | React.ReactNode;
}

type ConfigUpdate =
  | ModalFuncProps
  | ((prevConfig: ModalFuncProps) => ModalFuncProps);

type ModalFunc = (props: ModalFuncProps) => {
  destroy: () => void;
  update: (configUpdate: ConfigUpdate) => void;
};

type ModalStaticFunctions = Record<
  NonNullable<ModalFuncProps['type']>,
  ModalFunc
>;

let alertModal: Pick<ModalStaticFunctions, 'confirm'>;

type Props = {
  base?: 'success' | 'error' | 'warning';
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
};

function AlertContent({ base = 'warning', title, description }: Props) {
  return (
    <div className="mb-md">
      <div className="flex flex-col justify-center gap-none items-center">
        <Image
          alt="Alert icon"
          preview={false}
          width={250}
          height={200}
          className="flex items-center"
          src={`/assets/images/status/${base}.png`}
        />
        <div className="flex flex-col items-center">
          <div className="text-h6 font-bold">{title}</div>
          <div className=" text-subtitle2 font-medium text-secondary">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function useAlertModal() {
  const staticFunction = App.useApp();

  alertModal = staticFunction.modal;

  const { success, confirm } = staticFunction.modal;

  alertModal.confirm = (props) => {
    const { base, title, description, ..._props } = props;
    if (!base) {
      if (props?.cancelText)
        return confirm({
          ..._props,
        });
      else
        return success({
          ..._props,
        });
    }
    if (props?.cancelText)
      return confirm({
        ..._props,
        className: '[&_.ant-modal-confirm-btns]:text-center',
        content: (
          <AlertContent title={title} description={description} base={base} />
        ),

        icon: null,
        okButtonProps: { className: 'bg-brand rounded-md w-full' },
        cancelButtonProps: { className: 'rounded-md w-full' },
        footer: (_, { OkBtn, CancelBtn }) => {
          return (
            <div className="flex flex-row gap-sm  w-full">
              <CancelBtn />
              <OkBtn />
            </div>
          );
        },
      });
    else
      return success({
        ..._props,
        className: '[&_.ant-modal-confirm-btns]:text-center',
        content: (
          <AlertContent title={title} description={description} base={base} />
        ),

        icon: null,
        okButtonProps: { className: 'bg-brand rounded-md w-full' },
        footer: (_, { OkBtn }) => {
          return (
            <div className="w-full">
              <OkBtn />
            </div>
          );
        },
      });
  };

  return null;
}

export { alertModal };
