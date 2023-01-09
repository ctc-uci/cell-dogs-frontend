import { extendTheme } from '@chakra-ui/react';

const ChakraTheme = extendTheme({
  textStyles: {
    'header-1': {
      fontSize: '6em',
      fontFamily: 'Quicksand Semibold',
    },
    'header-2': {
      fontSize: '3em',
      fontFamily: 'Quicksand Semibold',
    },
    'header-3': {
      fontSize: '2.25em',
      fontFamily: 'Quicksand Semibold',
    },
    'header-4': {
      fontSize: '1.5em',
      fontFamily: 'Quicksand Semibold',
    },

    body: {
      fontSize: '1em',
      fontWeight: '600',
    },

    buttons: {
      fontSize: '1em',
      fontFamily: 'Noto Sans',
      fontWeight: '600',
    },

    main: {
      fontSize: '1em',
      fontFamily: 'Noto Sans',
      fontWeight: '600',
    },

    accent: {
      fontSize: '2em',
      fontFamily: 'Noto Serif',
      fontWeight: '600',
    },
  },
});

export default ChakraTheme;
