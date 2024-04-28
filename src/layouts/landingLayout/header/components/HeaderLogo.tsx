'use client';
import React from 'react';
import { Image } from 'antd';
import Link from 'next/link';

export const HeaderLogo = () => {
  return (
    <Link
      className="h-[76px] xs:h-[142px] xs:py-md xs:gap-md rounded-b-sm lg:rounded-b-lg flex flex-col bg-primary items-center justify-center"
      href={'/'}
    >
      <Image
        className="hidden xs:block xs:px-[10px]"
        alt=""
        preview={false}
        src="/assets/images/vercel.svg"
      />
      <div className="xs:hidden">
        <Image
          className="w-[48px] h-[56px]"
          alt="Child lab logo"
          preview={false}
          src="/assets/images/vercel.svg"
        />
      </div>
      <span className="hidden xs:block text-caption lg:text-body text-white font-bold text-center">
        Certify
        <br />
        By Codex
      </span>
    </Link>
  );
};
