'use client';

import { Col, Image, Row } from 'antd';
import { BannerBottom } from './BannerBottom';
import { Button } from '@/components';
import { IoArrowForwardOutline, IoLogoInstagram } from 'react-icons/io5';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export const LandingFooter = () => {
  const [isTooSmallScreen, setIsTooSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsTooSmallScreen(window.innerWidth < 360);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const router = useRouter();

  return (
    <footer>
      <BannerBottom />

      <div className=" flex flex-col bg-primary items-center">
        <div className="w-[100%] flex flex-col xs:flex-row xs:gap-md   px-md max-w-screen-xl">
          <div className="flex flex-row justify-center mx-auto py-sm px-md gap-md bg-surface-dark rounded-b-md xs:h-[184px] xs:flex-col  xs:mx-none xs:px-xxs sm:px-xs">
            <div className="w-[124px] h-[40px]">
              <Image
                alt="Certify"
                preview={false}
                src="/assets/images/vercel.svg"
              />
            </div>

            <span className=" text-body text-white font-bold xs:text-center">
              Certify
              <br />
              By CodeX
            </span>
          </div>
          <Row className="w-[100%] mb-md xs:mt-md md:mt-xl" gutter={[4, 4]}>
            <Col
              xs={24}
              sm={12}
              lg={5}
              xxl={4}
              className="xs:border-r xs:border-r-primary xs:border-dashed flex flex-col gap-tiny items-start"
            >
              <Button
                type="text"
                size="small"
                leftIcon={
                  <IoArrowForwardOutline className="left-icon text-brand-300" />
                }
                onClick={() => router.push('/')}
              >
                <span className="text-white">TOP</span>
              </Button>
              <Link
                href="https://earth-kids.com/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Button
                  type="text"
                  size="small"
                  leftIcon={
                    <IoArrowForwardOutline className="left-icon text-brand-300" />
                  }
                  onClick={() => router.push('/')}
                >
                  <span className="text-white">運営会社</span>
                </Button>
              </Link>
            </Col>
            <Col
              xs={24}
              sm={12}
              lg={7}
              xxl={6}
              className="md:border-r md:border-r-primary md:border-dashed"
            >
              <Button
                type="text"
                size="small"
                leftIcon={
                  <IoArrowForwardOutline className="left-icon text-brand-300" />
                }
              >
                <span className="text-white"> 利用規約</span>
              </Button>
              <Button
                type="text"
                size="small"
                leftIcon={
                  <IoArrowForwardOutline className="left-icon text-brand-300" />
                }
                onClick={() => router.push('/privacy')}
              >
                <span className="text-white">プライバシーポリシー</span>
              </Button>
            </Col>
            <Col
              xs={24}
              sm={12}
              lg={7}
              xxl={6}
              className="xs:border-r xs:border-r-primary xs:border-dashed"
            >
              <Link href={'/contact'}>
                <Button
                  type="text"
                  size="small"
                  leftIcon={
                    <IoArrowForwardOutline className="left-icon text-brand-300" />
                  }
                >
                  <span className="text-white"> お問い合わせ</span>
                </Button>
              </Link>
              <Button
                type="text"
                size="small"
                leftIcon={
                  <IoArrowForwardOutline className="left-icon text-brand-300" />
                }
              >
                <span className="text-white"> アプリについて</span>
              </Button>
            </Col>
            <Col xs={24} sm={12} lg={5} xxl={4}>
              <Button
                type="text"
                size="small"
                leftIcon={
                  <IoArrowForwardOutline className="left-icon text-brand-300" />
                }
              >
                <span className="text-white"> 法人様向け</span>
              </Button>
            </Col>
            <Col xs={24} lg={24} xxl={4}>
              <div className="flex flex-row xl:flex-col justify-center xs:justify-end">
                <Link
                  target="_blank"
                  href={'https://studiosora.jp/'}
                  className="rounded-l-md  xl:rounded-t-md xl:rounded-b-none  flex flex-row gap-xxs px-xxs py-tiny w-[132px] h-[52px] items-center bg-[#1AA6D1]"
                >
                  <Image
                    alt="Studio sora"
                    preview={false}
                    width={30}
                    height={30}
                    className="logo"
                    src="/assets/images/studioSora.svg"
                  />

                  <div className="flex flex-col ">
                    <div className=" text-caption font-bold text-white min-w-[80px]">
                      スタジオそら
                    </div>
                    <div className=" text-caption font-bold text-white">
                      Studio Sora
                    </div>
                  </div>
                </Link>
                <Link
                  href="https://www.instagram.com/childlab.jp/"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="rounded-r-md xl:rounded-b-md xl:rounded-t-none flex flex-row gap-xxs px-xxs py-tiny w-[132px] h-[52px] items-center bg-surface-secondary"
                >
                  <div className="flex text-[30px] text-primary">
                    <IoLogoInstagram />
                  </div>
                  <div>
                    <div
                      className={`font-bold text-secondary min-w-[80px] ${
                        isTooSmallScreen ? 'text-small' : 'text-caption'
                      }`}
                    >
                      インスタグラム
                    </div>
                    <div
                      className={`font-bold text-secondary ${
                        isTooSmallScreen ? 'text-small' : 'text-caption'
                      }`}
                    >
                      Instagram
                    </div>
                  </div>
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className=" flex flex-col bg-[#353E4B] items-center">
        <span className=" text-white py-xs2 text-caption xs:text-body font-normal">
          【発達障害/言葉の遅れ/自閉症/ADHD/療育】© Earth Kids Corp. All rights
          reserved.
        </span>
      </div>
    </footer>
  );
};
