import { heroui } from '@heroui/react';

export default heroui({
  prefix: 'heroui',
  addCommonColors: false,
  defaultTheme: 'light',
  defaultExtendTheme: 'light',
  themes: {
    light: {
      colors: {
        primary: '#7695EC',

        danger: '#FF5151',
        success: '#47B960',
        warning: '#FAB005',

        background: '#FFF',
        foreground: '#000',
      },
    },
  },
});
