import { createTheme, globalCss, Input, NextUIProvider, styled } from '@nextui-org/react';

import DatePicker from './lib/date-picker/DatePicker';
import { today, getLocalTimeZone } from '@internationalized/date';
import Box from './lib/shared/Box';

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
  flexDirection: "column",
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
});

const theme = createTheme({
  type: 'light',
  theme: {},
});

export default function App() {
  globalStyles();

  return (
    <NextUIProvider theme={theme}>
      <FlexParent>
        <Box css={{ display: 'flex', gap: '1rem', flexDirection: 'column'}}>
          <Box>
          <DatePicker label="Datepicker" minValue={today(getLocalTimeZone())} />
          </Box>
          <Box>
          <Input label="Normal Input for Comparison" placeholder="Placeholder"  />
          </Box>
          
        </Box>

      </FlexParent>
    </NextUIProvider>
  );
}
