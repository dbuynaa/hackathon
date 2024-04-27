/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { ButtonIcon } from '@/components';
import { Dropdown, MenuProps, Slider, Typography } from 'antd';
import { IoPlay, IoSettingsSharp } from 'react-icons/io5';
import ReactPlayer from 'react-player';
import { styled } from 'styled-components';
import {
  BiFullscreen,
  BiSolidVolumeLow,
  BiSolidVolumeMute,
} from 'react-icons/bi';
import { TbPlayerPauseFilled } from 'react-icons/tb';
import { useState, useRef } from 'react';
import { BaseReactPlayerProps, OnProgressProps } from 'react-player/base';

const StyledSlider = styled(Slider)`
  padding: 0px !important;
  margin: -12px !important;
  .ant-slider-rail {
    background-color: #ffffff5c !important;
    height: 8px !important;
    border-radius: 12px !important;
  }
  .ant-slider-track {
    background-color: #00b1e1 !important;
    height: 8px !important;
    border-radius: 12px !important;
  }
  .ant-slider-handle::after {
    width: 8px !important;
    height: 8px !important;
    box-shadow: none !important;
    border-radius: none !important;
    background-color: transparent !important;
  }
`;
interface Props {
  url: BaseReactPlayerProps['url'];
}
const format = (seconds: number | string) => {
  if (!seconds) return '00:00';
  const secondsAsNumber =
    typeof seconds === 'string' ? parseFloat(seconds) : seconds;

  const date = new Date(secondsAsNumber * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes().toString().padStart(2, '0');
  const ss = date.getUTCSeconds().toString().padStart(2, '0');
  if (hh) return `${hh}: ${mm}:${ss}`;
  return `${mm}:${ss}`;
};

const items: MenuProps['items'] = [
  {
    label: '0.25',
    key: 0.25,
  },
  {
    label: '0.5',
    key: 0.5,
  },
  {
    label: '0.75',
    key: 0.75,
  },
  {
    label: 'Normal',
    key: 1.0,
  },
  {
    label: '1.25',
    key: 1.25,
  },
  {
    label: '1.5',
    key: 1.5,
  },
  {
    label: '1.75',
    key: 1.75,
  },
  {
    label: '2.0',
    key: 2.0,
  },
];
export function VideoPlayer({ url }: Props) {
  const [state, setState] = useState({
    playing: false,
    muted: false,
    volume: 0.5,
    volumeSeek: true,
    fullScreen: false,
    played: 0,
    videoDuration: 0,
    playbackRate: 1.0,
  });

  const handlePlay = () => {
    setState({
      ...state,
      playing: !state.playing,
    });
  };
  const handleMute = () => {
    setState({
      ...state,
      muted: !state.muted,
    });
  };

  const fullScreenVideoRef = useRef(null);
  const playerRef = useRef<ReactPlayer | null>(null);

  const toggleScreen = () => {
    const element = document.getElementById('full-screen');
    if (!state.fullScreen) {
      if (element && element.requestFullscreen) {
        element.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setState({ ...state, fullScreen: !state.fullScreen });
  };
  const handleProgress = (changeState: OnProgressProps) => {
    setState({
      ...state,
      played: changeState.playedSeconds,
      videoDuration: changeState.loadedSeconds,
    });
    if (
      playerRef?.current?.getDuration() &&
      playerRef?.current?.getDuration() - state.played < 1
    ) {
      setState({ ...state, playing: false, played: 0 });
    }
  };
  const onChangeSeek = (value: number) => {
    setState({ ...state, played: value });
    playerRef?.current?.seekTo(value, 'seconds');
  };
  const currentTime = playerRef.current
    ? playerRef.current.getCurrentTime()
    : '00:00';
  const duration = playerRef.current
    ? playerRef.current.getDuration()
    : '00:00';
  const elapsedTime = format(currentTime);
  const totalDuration = format(duration);
  const onClick: MenuProps['onClick'] = ({ key }) => {
    setState({ ...state, playbackRate: parseFloat(key) });
  };
  return (
    <div className="w-full h-dvh" ref={fullScreenVideoRef} id="full-screen">
      <ReactPlayer
        ref={playerRef}
        controls={false}
        playing={state.playing}
        muted={state.muted}
        volume={state.volume}
        url={url}
        className="w-full h-full"
        onProgress={handleProgress}
        playbackRate={state.playbackRate}
        config={{
          file: {
            attributes: {
              onContextMenu: (e: any) => e.preventDefault(),
              controlsList: 'nodownload',
            },
          },
        }}
      />
      <div className="relative top-[-84px] p-xs flex flex-col gap-xs">
        <StyledSlider
          min={0}
          max={state.videoDuration}
          value={state.played}
          tooltip={{ open: false }}
          onChange={onChangeSeek}
        />
        <div className="flex justify-between ">
          <div className="flex gap-[8px] items-center w-[250px]">
            <ButtonIcon
              size="small"
              type="text"
              icon={
                state.playing ? (
                  <TbPlayerPauseFilled className="text-white" />
                ) : (
                  <IoPlay className="text-white" />
                )
              }
              onClick={handlePlay}
            />
            <ButtonIcon
              size="small"
              type="text"
              icon={
                state.muted ? (
                  <BiSolidVolumeMute className="text-white" />
                ) : (
                  <BiSolidVolumeLow className="text-white" />
                )
              }
              onClick={handleMute}
            />
            <Slider
              className={`w-[30%] m-[0] ${state.volumeSeek && 'hidden'}`}
              step={0.1}
              min={0}
              max={1}
              value={state.volume}
              tooltip={{ open: false }}
              onChange={(value) => {
                setState({ ...state, volume: value });
              }}
            />
            <Typography className="block text-white opacity-50 w-[100px] ">
              {elapsedTime}/{totalDuration}
            </Typography>
          </div>
          <div className="flex gap-[8px] items-center">
            <Dropdown
              menu={{ items, onClick }}
              trigger={['click']}
              placement="bottom"
            >
              <ButtonIcon
                size="small"
                type="text"
                icon={<IoSettingsSharp className="text-white" />}
              />
            </Dropdown>

            <ButtonIcon
              size="small"
              type="text"
              icon={<BiFullscreen className="text-white" />}
              onClick={toggleScreen}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
