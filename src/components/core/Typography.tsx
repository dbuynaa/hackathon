'use client';

import { styled } from 'styled-components';
import { Typography as AntTypography } from 'antd';
import { TextProps } from 'antd/es/typography/Text';

type BaseType =
  | 'H1'
  | 'H2'
  | 'H3'
  | 'H4'
  | 'H5'
  | 'H6'
  | 'Subtitle'
  | 'Subtitle2'
  | 'Body'
  | 'Caption'
  | 'Small';

type WeightType = 'bold' | 'medium' | 'regular';

interface Props extends TextProps {
  base?: BaseType;
  weight?: WeightType;
}

const StyledTypography = styled(AntTypography.Text)`
  font-weight: 400;
  font-size: ${(props) => props.theme.fontSize.body} !important;
  font-family: M PLUS 1;
  &.H1 {
    font-size: ${(props) => props.theme.fontSize.h1} !important;
    letter-spacing: -1.5px;
    line-height: 116.70000553131104%;
  }
  &.H2 {
    font-size: ${(props) => props.theme.fontSize.h2} !important;
    letter-spacing: -0.5px;
    line-height: 120.00000476837158%;
  }
  &.H3 {
    font-size: ${(props) => props.theme.fontSize.h3} !important;
    letter-spacing: 0px;
    line-height: 116.70000553131104%;
  }
  &.H4 {
    font-size: ${(props) => props.theme.fontSize.h4} !important;
    letter-spacing: 0.25px;
    line-height: 123.50000143051147%;
  }
  &.H5 {
    font-size: ${(props) => props.theme.fontSize.h5} !important;
    letter-spacing: 0px;
    line-height: 133.39999914169312%;
  }
  &.H6 {
    font-size: ${(props) => props.theme.fontSize.h6} !important;
    letter-spacing: 0.15000000596046448px;
    line-height: 160.0000023841858%;
  }
  &.Subtitle {
    font-size: ${(props) => props.theme.fontSize.subtitle} !important;
    letter-spacing: 0.15000000596046448px;
  }
  &.Subtitle2 {
    font-size: ${(props) => props.theme.fontSize.subtitle2} !important;
    letter-spacing: 0.15000000596046448px;
  }
  &.Body {
    font-size: ${(props) => props.theme.fontSize.body} !important;
    letter-spacing: 0.17000000178813934px;
    line-height: 142.99999475479126%;
  }
  &.Caption {
    font-size: ${(props) => props.theme.fontSize.caption} !important;
    letter-spacing: 0.4000000059604645px;
    line-height: 136.00000143051147%;
  }
  &.Small {
    font-size: ${(props) => props.theme.fontSize.small} !important;
    letter-spacing: 0.4000000059604645px;
    line-height: 125.99999904632568%;
  }
  &.bold {
    font-weight: 700;
  }
  &.medium {
    font-weight: 500;
  }
  &.regular {
    font-weight: 400;
  }
`;

export function Typography(props: Props) {
  // Default
  // base - Body || weight - regular

  const { children, base, weight, className, ..._props } = props;

  let _className = className;
  if (base) _className = _className + ` ${base}`;
  if (weight) _className = _className + ` ${weight}`;

  return (
    <StyledTypography {..._props} className={_className}>
      {children}
    </StyledTypography>
  );
}
