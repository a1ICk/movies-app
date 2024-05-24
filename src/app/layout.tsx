'use client';

import {
  ColorSchemeScript,
  MantineProvider,
  Input,
  createTheme,
  Select,
  MultiSelect,
  Pill,
} from '@mantine/core';
import styles from './select.module.css';

const theme = createTheme({
  fontFamily: 'Inter, sans-serif',
  components: {
    Input: Input.extend({
      classNames: styles,
    }),
    Select: Select.extend({
      classNames: styles,
    }),
    MultiSelect: MultiSelect.extend({
      classNames: styles,
    }),
    Pill: Pill.extend({
      classNames: styles,
    }),
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
