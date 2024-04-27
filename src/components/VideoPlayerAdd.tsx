'use client';

import { FormInstance } from 'antd';
import { useRef } from 'react';
import ReactPlayer from 'react-player';
import { BaseReactPlayerProps } from 'react-player/base';

interface Props {
  url: BaseReactPlayerProps['url'];
  form?: FormInstance;
}

export function VideoPlayerAdd({ url }: Props) {
  const playerRef = useRef<ReactPlayer | null>(null);

  return (
    <div className="w-full" id="full-screen">
      <ReactPlayer
        className="w-full h-[318px]"
        url={url}
        ref={playerRef}
        controls={true}
        config={{
          file: {
            attributes: {
              controlsList: 'nodownload',
            },
          },
        }}
      />
    </div>
  );
}
