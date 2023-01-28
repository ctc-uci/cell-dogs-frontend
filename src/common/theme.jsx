import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    cdsBlue1: '#21307A',
    cdsBlue2: '#C3CBDB',
    cdsBlue3: '#F6F7FA',
    cdsGreen1: '#96C93D',
    cdsGrey1: '#25222A',
  },
  styles: {
    global: {
      h1: {
        fontFamily: 'Quicksand-SemiBold, sans-serif',
        fontSize: '6em',
        display: 'block',
      },
      h2: {
        fontFamily: 'Quicksand-SemiBold, sans-serif',
        fontSize: '3em',
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
  // h2: {
  //   fontFamily: 'Quicksand-SemiBold, sans-serif',
  //   fontSize: '3em',
  // },
  // h3: {
  //   fontFamily: 'Quicksand-SemiBold, sans-serif',
  //   fontSize: '2.25em',
  // },
  // h4: {
  //   fontFamily: 'Quicksand-SemiBold, sans-serif',
  //   fontSize: '1.5em',
  // },
  // button: {
  //   fontFamily: 'NotoSans-Semibold',
  //   fontSize: '1em',
  // },
  // body: {
  //   fontFamily: 'NotoSans-Regular',
  //   fontSize: '1em',
  // },
});

export default theme;
