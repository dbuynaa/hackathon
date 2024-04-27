import type { Config } from 'tailwindcss';

export default {
  important: true,
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    // ANT DESING
    // xs	screen < 575
    // sm	screen ≥ 639
    // md	screen ≥ 767
    // lg	screen ≥ 1023
    // xl	screen ≥ 1279
    // xxl	screen ≥ 1280

    screens: {
      tiny: '360px',
      '2xs': '480px',
      xs: '576px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
    },
    extend: {
      fontFamily: { 'm-plus-1': 'M PLUS 1' },
    },
    colors: {
      neutral: {
        50: '#f9fafb',
        100: '#f1f2f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
        DEFAULT: '#1f2937',
      },
      primary: {
        100: '#e5f7fc',
        300: '#66d0ed',
        400: '#47c7e9',
        500: '#1fbae5',
        600: '#00b1e1',
        700: '#009cc6',
        800: '#007fa2',
        900: '#006a87',
        DEFAULT: '#00b1e1',
      },
      brand: {
        100: '#e5f7fc',
        300: '#66d0ed',
        400: '#47c7e9',
        500: '#1fbae5',
        600: '#00b1e1',
        700: '#009cc6',
        800: '#007fa2',
        900: '#006a87',
        DEFAULT: '#00b1e1',
      },
      success: {
        100: '#e9f9ef',
        300: '#7adc9e',
        400: '#60d58b',
        500: '#3dcc71',
        600: '#22c55e',
        700: '#1ead53',
        800: '#188e44',
        900: '#147638',
        DEFAULT: '#22c55e',
      },
      warning: {
        100: '#fef5e7',
        300: '#f9c56d',
        400: '#f8b94f',
        500: '#f6aa28',
        600: '#f59e0b',
        700: '#d88b0a',
        800: '#b07208',
        900: '#935f07',
        DEFAULT: '#f59e0b',
      },
      error: {
        100: '#ffeded',
        300: '#ff9292',
        400: '#ff7c7c',
        500: '#ff5f5f',
        600: '#ff4949',
        700: '#e04040',
        800: '#b83535',
        900: '#992c2c',
        DEFAULT: '#ff4949',
      },
      info: {
        100: '#e5eeff',
        300: '#669aff',
        400: '#4786ff',
        500: '#1f6bff',
        600: '#0057ff',
        700: '#004de0',
        800: '#003fb8',
        900: '#003499',
        DEFAULT: '#0057ff',
      },
      surface: {
        primary: '#ffffff',
        secondary: '#f1f2f6',
        brand: '#00b1e1',
        invert: '#1f2937',
        dark: '#1f2937',
        darkBrand: '#1f2937',
        light: '#ffffff',
        brandDark: '#00b1e1',
        brandLightDark: '#e5f7fc',
      },
      // onPrimary: {
      //   focus: '#00b1e1',
      //   selected: '#00b1e1',
      //   hover: '#00b1e1',
      //   pressed: '#00b1e1',
      //   disabled: '#e0e0e0',
      // },
      // onBlack: {
      //   focus: '#1f2937',
      //   selected: '#1f2937',
      //   hover: '#1f2937',
      //   pressed: '#1f2937',
      //   disabled: '#e0e0e0',
      // },
      // brandOverlay: {
      //   focus: '#00b1e1',
      //   selected: '#00b1e1',
      //   hover: '#00b1e1',
      //   pressed: '#1d209b',
      // },
      white: '#ffffff',
    },
    boxShadow: {
      sm: '0px 4px 10px 0px rgba(0,0,0,0.1)',
      md: '0px 4px 20px 0px rgba(26,42,97,0.1)',
      lg: '0px 4px 30px 0px rgba(26,42,97,0.2)',
      xl: '0px 4px 35px 0px rgba(26,42,97,0.25)',
      brandSm: '0px 4px 20px 0px rgba(0,177,225,0.1)',
      brandMd: '0px 4px 20px 0px rgba(0,177,225,0.1)',
      brandLg: '0px 4px 30px 0px rgba(0,177,225,0.2)',
      brandXl: '0px 4px 35px 0px rgba(0,177,225,0.25)',
      none: 'none',
    },
    borderRadius: {
      DEFAULT: '0.25rem',
      none: '0px',
      tiny: '4px',
      xxs: '6px',
      xs: '8px',
      sm: '12px',
      md: '14px',
      lg: '24px',
      xl: '32px',
    },
    borderColor: {
      dark: '#dedede',
      secondary: '#f1f2f6',
      brand: '#00b1e1',
      primary: '#dedede',
      error: '#ff4949',
      success: '#22c55e',
      warning: '#f59e0b',
    },
    stroke: { dark: '#dedede', secondary: '#f1f2f6' },
    textColor: {
      primary: '#1f2937',
      secondary: '#6b7280',
      brand: {
        100: '#e5f7fc',
        300: '#66d0ed',
        400: '#47c7e9',
        500: '#1fbae5',
        600: '#00b1e1',
        700: '#009cc6',
        800: '#007fa2',
        900: '#006a87',
        DEFAULT: '#00b1e1',
      },
      neutral: {
        50: '#f9fafb',
        100: '#f1f2f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
        DEFAULT: '#1f2937',
      },
      invert: '#f9fafb',
      white: '#ffffff',
      error: '#ff4949',
      success: '#22c55e',
      warning: '#f59e0b',
      info: '#0057FF',
    },
    fontSize: {
      h1: '96px',
      h2: '60px',
      h3: '48px',
      h4: '34px',
      h5: '24px',
      h6: '20px',
      subtitle: '18px',
      subtitle2: '16px',
      body: '14px',
      caption: '12px',
      small: '10px',
    },
    spacing: {
      DEFAULT: '0.25rem',
      none: '0px',
      micro: '2px',
      tiny: '4px',
      xxs: '6px',
      xs: '12px',
      xs2: '14px',
      sm: '16px',
      md: '24px',
      lg: '32px',
      xl: '48px',
      xxl: '64px',
    },
    custom: { width: '100%', height: '100%' },
  },
  plugins: [],
} satisfies Config;
