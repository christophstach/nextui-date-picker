import { createTheme, globalCss, NextUIProvider, styled } from '@nextui-org/react';

import DatePicker from './lib/date-picker/DatePicker';
import { today, getLocalTimeZone } from '@internationalized/date';

// Photo by <a href="https://unsplash.com/@heytowner?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">JOHN TOWNER</a> on <a href="https://unsplash.com/s/photos/dark?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

const globalStyles = globalCss({
  'body, html, #root, #root > div': {
    height: '100%',
  },
  body: {
    background: '$gray100',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
});

const FlexParent = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
});

const darkTheme = createTheme({
  type: 'dark',
  theme: {},
});

export default function App() {
  globalStyles();

  return (
    <NextUIProvider theme={darkTheme}>
      <FlexParent>
        <div>
          <DatePicker label="Datepicker" minValue={today(getLocalTimeZone())} />
        </div>
      </FlexParent>
    </NextUIProvider>
  );
}
