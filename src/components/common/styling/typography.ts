import Color from './color';

const common = `
  font-family: "PT serif";
`

export enum TypographyTheme {
  Primary = 'primary',
  Secondary = 'secondary',
  Title = 'title',
}

export enum TypographySize {
  XS = 'xs',
  S = 's',
  M = 'm',
  L = 'l',
}

export enum TypographyWeight {
  Regular = 'regular',
  Medium = 'medium',
  Bold = 'bold',
}

export type TypographyConfig = {
  size: TypographySize;
  theme: TypographyTheme;
  weight: TypographyWeight;
}

export type TypographyConfigOptional = {
  size?: TypographySize;
  theme?: TypographyTheme;
  weight?: TypographyWeight;
}

const Typography: Record<TypographyTheme, Record<TypographySize, Record<TypographyWeight, string>>> = {
  primary: {
    xs: {
      regular: `
        ${common}
        font-size: 10px;
        line-height: 15px;
        font-weight: normal;
        color: ${Color.TextPrimary};
      `,
      medium: `
        ${common}
        font-size: 10px;
        line-height: 15px;
        font-weight: 500;
        color: ${Color.TextPrimary};
      `,
      bold: `
        ${common}
        font-size: 10px;
        line-height: 15px;
        font-weight: 600;
        color: ${Color.TextPrimary};
      `,
    },
    s: {
      regular: `
        ${common}
        font-size: 12px;
        line-height: 16px;
        font-weight: normal;
        color: ${Color.TextPrimary};
      `,
      medium: `
        ${common}
        font-size: 12px;
        line-height: 16px;
        font-weight: 500;
        color: ${Color.TextPrimary};
      `,
      bold: `
        ${common}
        font-size: 12px;
        line-height: 16px;
        font-weight: 600;
        color: ${Color.TextPrimary};
      `,
    },
    m: {
      regular: `
        ${common}
        font-size: 14px;
        line-height: 18px;
        font-weight: normal;
        color: ${Color.TextPrimary};
      `,
      medium: `
        ${common}
        font-size: 14px;
        line-height: 18px;
        font-weight: 500;
        color: ${Color.TextPrimary};
      `,
      bold: `
        ${common}
        font-size: 14px;
        line-height: 18px;
        font-weight: 600;
        color: ${Color.TextPrimary};
      `,
    },
    l: {
      regular: `
        ${common}
        font-size: 16px;
        line-height: 24px;
        font-weight: normal;
        color: ${Color.TextPrimary};
      `,
      medium: `
        ${common}
        font-size: 16px;
        line-height: 24px;
        font-weight: 500;
        color: ${Color.TextPrimary};
      `,
      bold: `
        ${common}
        font-size: 16px;
        line-height: 24px;
        font-weight: 600;
        color: ${Color.TextPrimary};
      `,
    }
  },
  secondary: {
    xs: {
      regular: `
        ${common}
        font-size: 10px;
        line-height: 15px;
        font-weight: normal;
        color: ${Color.TextSecondary};
      `,
      medium: `
        ${common}
        font-size: 10px;
        line-height: 15px;
        font-weight: 500;
        color: ${Color.TextSecondary};
      `,
      bold: `
        ${common}
        font-size: 10px;
        line-height: 15px;
        font-weight: 600;
        color: ${Color.TextSecondary};
      `,
    },
    s: {
      regular: `
        ${common}
        font-size: 12px;
        line-height: 16px;
        font-weight: normal;
        color: ${Color.TextSecondary};
      `,
      medium: `
        ${common}
        font-size: 12px;
        line-height: 16px;
        font-weight: 500;
        color: ${Color.TextSecondary};
      `,
      bold: `
        ${common}
        font-size: 12px;
        line-height: 16px;
        font-weight: 600;
        color: ${Color.TextSecondary};
      `,
    },
    m: {
      regular: `
        ${common}
        font-size: 14px;
        line-height: 18px;
        font-weight: normal;
        color: ${Color.TextSecondary};
      `,
      medium: `
        ${common}
        font-size: 14px;
        line-height: 18px;
        font-weight: 500;
        color: ${Color.TextSecondary};
      `,
      bold: `
        ${common}
        font-size: 14px;
        line-height: 18px;
        font-weight: 600;
        color: ${Color.TextSecondary};
      `,
    },
    l: {
      regular: `
        ${common}
        font-size: 16px;
        line-height: 20px;
        font-weight: normal;
        color: ${Color.TextSecondary};
      `,
      medium: `
        ${common}
        font-size: 16px;
        line-height: 20px;
        font-weight: 500;
        color: ${Color.TextSecondary};
      `,
      bold: `
        ${common}
        font-size: 16px;
        line-height: 20px;
        font-weight: 600;
        color: ${Color.TextSecondary};
      `,
    }
  },
  title: {
    xs: {
      regular: `
        ${common}
        font-size: 14px;
        line-height: 18px;
        font-weight: normal;
        color: ${Color.TextPrimary};
      `,
      medium: `
        ${common}
        font-size: 14px;
        line-height: 18px;
        font-weight: 500;
        color: ${Color.TextPrimary};
      `,
      bold: `
        ${common}
        font-size: 14px;
        line-height: 18px;
        font-weight: 600;
        color: ${Color.TextPrimary};
      `,
    },
    s: {
      regular: `
        ${common}
        font-size: 16px;
        line-height: 20px;
        font-weight: normal;
        color: ${Color.TextPrimary};
      `,
      medium: `
        ${common}
        font-size: 16px;
        line-height: 20px;
        font-weight: 500;
        color: ${Color.TextPrimary};
      `,
      bold: `
        ${common}
        font-size: 16px;
        line-height: 20px;
        font-weight: 600;
        color: ${Color.TextPrimary};
      `,
    },
    m: {
      regular: `
        ${common}
        font-size: 20px;
        line-height: 24px;
        font-weight: normal;
        color: ${Color.TextPrimary};
      `,
      medium: `
        ${common}
        font-size: 20px;
        line-height: 24px;
        font-weight: 500;
        color: ${Color.TextPrimary};
      `,
      bold: `
        ${common}
        font-size: 20px;
        line-height: 24px;
        font-weight: 600;
        color: ${Color.TextPrimary};
      `,
    },
    l: {
      regular: `
        ${common}
        font-size: 24px;
        line-height: 28px;
        font-weight: normal;
        color: ${Color.TextPrimary};
      `,
      medium: `
        ${common}
        font-size: 24px;
        line-height: 28px;
        font-weight: 500;
        color: ${Color.TextPrimary};
      `,
      bold: `
        ${common}
        font-size: 24px;
        line-height: 28px;
        font-weight: 600;
        color: ${Color.TextPrimary};
      `,
    },
  }
};

export default Typography;
