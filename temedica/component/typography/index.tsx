import React, { FC } from 'react';
import styled from 'styled-components';
import { capitalize } from '../../utils';
import { devices } from '../../styles';

const StyledTypography = styled.div<{
  align: string | undefined;
  minWidth: string | undefined;
  width?: string | undefined;
}>`
  text-align: ${props => props.align || 'left'};
  width: ${props => props.width || 'auto'};
  word-wrap: break-word;
  min-width: ${props => props.minWidth || 'auto'};
  .typographyVariantH1 {
    font-size: ${props => props.theme.fontSizes.mobile.h1};
    font-weight: 500;
  }
  .typographyVariantH2 {
    font-size: ${props => props.theme.fontSizes.mobile.h2};
    font-weight: 500;
  }
  .typographyVariantH3 {
    font-size: ${props => props.theme.fontSizes.mobile.h3};
    font-weight: 500;
  }
  .typographyVariantH4 {
    font-size: ${props => props.theme.fontSizes.mobile.h4};
    font-weight: 500;
  }
  .typographyVariantH5 {
    font-size: ${props => props.theme.fontSizes.mobile.h5};
    font-weight: 500;
  }
  .typographyVariantH6 {
    font-size: ${props => props.theme.fontSizes.mobile.h6};
    font-weight: 500;
  }
  .typographyVariantSubheading1 {
    font-size: ${props => props.theme.fontSizes.mobile.subheading1};
    font-weight: 500;
  }
  .typographyVariantSubheading2 {
    font-size: ${props => props.theme.fontSizes.mobile.subheading2};
    font-weight: 500;
  }
  .typographyVariantBody1 {
    font-size: ${props => props.theme.fontSizes.mobile.body1};
  }
  .typographyVariantBody2 {
    font-size: ${props => props.theme.fontSizes.mobile.body2};
  }

  @media ${devices['tablet']} {
    .typographyVariantH6 {
      font-size: ${props => props.theme.fontSizes.tablet.h6};
      font-weight: 500;
    }
    .typographyVariantBody1 {
      font-size: ${props => props.theme.fontSizes.tablet.body1};
    }
    .typographyVariantBody2 {
      font-size: ${props => props.theme.fontSizes.tablet.body2};
    }
  }
  // colors
  .success {
    color: ${props => props.theme.colors.typoSuccess};
  }
  .error {
    color: ${props => props.theme.colors.typoError};
  }
  .primary {
    color: ${props => props.theme.colors.typoPrimary};
  }
  .secondary {
    color: ${props => props.theme.colors.typoSecondary};
  }
  .alignRight {
    text-align: right;
  }
  .alignLeft {
    text-align: left;
  }
  .alignCenter {
    text-align: center;
  }
`;

enum VariantsMapping {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
  h6 = 'h6',
  subheading1 = 'h6',
  subheading2 = 'h6',
  body1 = 'p',
  body2 = 'p',
}
enum ColorClassMapping {
  success = 'success',
  error = 'error',
  primary = 'primary',
  secondary = 'secondary',
}
enum AlignClassMapping {
  right = 'alignRight',
  left = 'alignLeft',
  center = 'alignCenter',
}
interface TypographyProps {
  variant: keyof typeof VariantsMapping;
  color?: keyof typeof ColorClassMapping;
  align?: keyof typeof AlignClassMapping;
  width?: string | undefined;
  maxWidth?: string;
  minWidth?: string;
  customClass?: string;
}

const Typography: FC<TypographyProps> = ({
  variant,
  color,
  align,
  width,
  minWidth,
  children,
  customClass,
  ...rest
}) => {
  const Component = () =>
    React.createElement(
      variant ? VariantsMapping[variant] : 'p',
      {
        ...rest,
        className: `typographyVariant${capitalize(variant)}  ${
          color && ColorClassMapping[color] ? ColorClassMapping[color] : color
        } ${customClass}`,
      },
      children,
    );
  return (
    <StyledTypography align={align} width={width} minWidth={minWidth}>
      <Component />
    </StyledTypography>
  );
};

export default Typography;
