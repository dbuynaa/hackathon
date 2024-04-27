// // theme/themeConfig.ts
import type { ThemeConfig } from 'antd';

const theme: ThemeConfig = {
  token: {
    /// COLORS
    colorPrimary: '#00B1E1',
    /// HEIGHTS
    controlHeight: 46,
    controlHeightLG: 56,
    controlHeightSM: 36,
    controlHeightXS: 26,

    /// RADIUS
    // borderRadiusLG: 14,
    // borderRadius: 14,
    // borderRadiusSM: 12,
    // borderRadiusXS: 12,

    //Input values

    // colorBorder: '#DEDEDE',
    // colorIcon: '#00B1E1',

    screenXS: 480,
    screenXSMax: 575,
    screenXSMin: 480,

    screenSM: 576,
    screenSMMax: 639,
    screenSMMin: 576,

    screenMD: 640,
    screenMDMax: 767,
    screenMDMin: 640,

    screenLG: 768,
    screenLGMax: 1023,
    screenLGMin: 768,

    screenXL: 1024,
    screenXLMax: 1279,
    screenXLMin: 1024,

    screenXXL: 1280,
    screenXXLMin: 1280,
  },
  components: {
    Input: {
      // hoverBorderColor: '#00b1e1',
    },
    Button: {
      // borderRadiusLG: 14,
      // borderRadius: 14,
      // borderRadiusSM: 12,
      // borderRadiusXS: 12,
    },
  },
};

export default theme;
