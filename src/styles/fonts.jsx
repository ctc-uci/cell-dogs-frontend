import React from 'react';
import { Global } from '@emotion/react';

const Fonts = () => (
  <Global
    styles={`
    @font-face {
      font-family: 'Quicksand Semibold';
      src: url('../../assets/fonts/Quicksand-SemiBold.ttf');
    }
    @font-face {
      font-family: 'Noto Sans';
      src: url('../../assets/fonts/NotoSans-Regular.ttf');
    }
    @font-face {
      font-family: 'Noto Sans Semibold';
      src: url('../../assets/fonts/NotoSans-SemiBold.ttf');
    }
    @font-face {
      font-family: 'Noto Serif';
      src: url('../../assets/fonts/NotoSerif-Regular.ttf');
    }
    `}
  />
);

export default Fonts;
