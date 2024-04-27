import { Button, Image } from 'antd';

import { IoLogoApple, IoLogoGooglePlaystore } from 'react-icons/io5';

export const BannerBottom = () => {
  return (
    <div className="py-lg xs:py-none xs:px-sm h-[300px] lg:h-[360px] flex flex-row items-center xs:items-end justify-center bg-surface-brandLightDark">
      <div className="hidden xs:flex ">
        <Image
          className="max-h-[281px] lg:max-h-[330px]"
          alt="Child lab board img"
          preview={false}
          src="/assets/images/footer_banner_board.png"
        />
      </div>
      <div className="gap-sm lg:gap-lg xs:h-[100%] xs:justify-center flex flex-col items-center">
        <Image
          className="w-[130px] h-[40px]"
          alt="Child lab logo"
          preview={false}
          src="/assets/images/logo_A.png"
        />
        <span className="text-subtitle lg:text-h5 font-bold">
          アプリで、もっと身近で便利に。
        </span>
        <div className=" flex flex-row items-center gap-md lg:gap-lg">
          <div className="w-[140px] lg:w-[180px] flex flex-col gap-sm">
            <Button
              className="flex flex-row p-none items-center justify-center bg-brand lg:h-[52px]"
              type="primary"
              icon={<IoLogoApple className="text-h5 text-white" />}
            >
              <div className="flex flex-col items-start">
                <span className=" text-body font-bold">AppStore</span>
                <span className=" text-small font-normal">
                  からダウンロード
                </span>
              </div>
            </Button>
            <Button
              className="flex flex-row p-none items-center justify-center bg-brand lg:h-[52px]"
              type="primary"
              icon={<IoLogoGooglePlaystore className="text-h5 text-white" />}
            >
              <div className="flex flex-col items-start">
                <span className=" text-body font-bold">PlayStore</span>
                <span className=" text-small font-normal">で手に入れよう</span>
              </div>
            </Button>
          </div>
          <div className="w-[98px] h-[98px] lg:w-[120px] lg:h-[120px]">
            <Image
              alt="Child lab qr"
              preview={false}
              src="/assets/images/qr.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
