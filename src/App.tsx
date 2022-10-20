import { createTheme, globalCss, NextUIProvider, styled } from '@nextui-org/react';
import { SingleDatePicker } from './lib';
import backgroundImage from './assets/john-towner-JgOeRuGD_Y4-unsplash.jpg';

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
          <SingleDatePicker inputProps={{ label: 'Single Date Picker' }} />
        </div>
      </FlexParent>
    </NextUIProvider>
  );
}
