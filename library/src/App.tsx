import { useState } from 'react';
import { createTheme, globalCss, Input, NextUIProvider, styled } from '@nextui-org/react';
import { today, getLocalTimeZone, endOfMonth } from '@internationalized/date';
import { DateValue } from '@react-types/datepicker';

import DatePicker from './lib/date-picker/DatePicker';
import Box from './lib/shared/Box';

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
  flexDirection: 'column',
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

  const [dateValue, setDateValue] = useState<DateValue>(null as unknown as DateValue);
  const dateToday = today(getLocalTimeZone());

  return (
    <NextUIProvider theme={theme}>
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
          <Box>
            <Input label="Normal Input for Comparison" value="Test" placeholder="Placeholder" />
          </Box>

          <pre>{JSON.stringify(dateValue?.toDate(getLocalTimeZone()), null, 2)}</pre>
        </Box>
      </FlexParent>
    </NextUIProvider>
  );
}
