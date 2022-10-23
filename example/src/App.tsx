import { useState } from 'react';
import { createTheme, globalCss, NextUIProvider, styled } from '@nextui-org/react';
import { Navbar, Text, Switch } from '@nextui-org/react';
import { today, getLocalTimeZone, endOfMonth } from '@internationalized/date';
import { DateValue } from '@react-types/datepicker';
import { DatePicker } from 'nextui-date-picker';

const globalStyles = globalCss({
  'body, html, #root, #root > div': {
    height: '100%',
  },
  body: {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
});

const Box = styled('div');

const Page = styled('div', {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '$2xl',
  background: '$accents3',
});

const FlexParent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
});

const lightTheme = createTheme({
  type: 'light',
  theme: {},
});

const darkTheme = createTheme({
  type: 'dark',
  theme: {},
});

export default function App() {
  globalStyles();

  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [dateValue, setDateValue] = useState<DateValue>(null as unknown as DateValue);
  const dateToday = today(getLocalTimeZone());

  function handleToggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <NextUIProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <Page>
        <Navbar variant="floating">
          <Navbar.Brand>
            <Text b color="inherit" hideIn="xs">
              nextui-date-picker
            </Text>
          </Navbar.Brand>
          <Navbar.Content>
            Darkmode <Switch checked={theme === 'dark'} onChange={handleToggleTheme} />
          </Navbar.Content>
        </Navbar>

        <FlexParent>
          <Box css={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
            <Box>
              <DatePicker
                label="Datepicker"
                value={dateValue}
                onChange={setDateValue}
                minValue={dateToday}
                maxValue={endOfMonth(dateToday)}
              />
            </Box>
            <hr />
            <Box>Value: {JSON.stringify(dateValue?.toDate(getLocalTimeZone()), null, 2)}</Box>
          </Box>
        </FlexParent>
      </Page>
    </NextUIProvider>
  );
}
