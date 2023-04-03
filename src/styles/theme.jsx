import { extendTheme } from '@chakra-ui/react';

const CDSTheme = extendTheme({
  colors: {
    CDSBlue1: '#21307a',
  },
  fonts: {
    h1: 'Quicksand Semibold',
  },
  styles: {
    global: {
      h1: {
        fontFamily: `'Quicksand Semibold', sans-serif`,
        fontSize: '6em',
        display: 'block',
      },
      h2: {
        fontFamily: `'Quicksand Semibold', sans-serif`,
        fontSize: '3em',
        display: 'block',
      },
      h4: {
        fontFamily: `'Quicksand Semibold', sans-serif`,
        fontSize: '1.5em',
      },
    },
  },

  components: {
    IconButton: {
      variants: {
        noHover: {
          _hover: {},
          _active: {},
        },
      },
    },
  },
});

export default CDSTheme;
