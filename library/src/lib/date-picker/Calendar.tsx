import { useCalendarState } from '@react-stately/calendar';
import { useCalendar } from '@react-aria/calendar';
import { useLocale } from '@react-aria/i18n';
import { createCalendar, today, getLocalTimeZone } from '@internationalized/date';
import { Button, styled, Text } from '@nextui-org/react';
import { DateValue } from '@react-types/datepicker';
import { AriaCalendarProps } from 'react-aria';

import Box from '../shared/Box';
import CalendarGrid from './CalendarGrid';

const CalendarHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingBottom: '1rem',
  gap: '0.5rem',
});

const CalendarFooter = styled('div', {
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: '1rem',
});

interface CalendarProps extends AriaCalendarProps<DateValue> {
  todayLabel?: string;
}

export default function Calendar(props: CalendarProps) {
  const { todayLabel = 'Today' } = props;

  const { locale } = useLocale();
  const state = useCalendarState({
    ...props,
    locale,
    createCalendar,
  });

  const { calendarProps, prevButtonProps, nextButtonProps, title } = useCalendar(props, state);

  const prevButtonDisabled = prevButtonProps.isDisabled;
  const nextButtonDisabled = nextButtonProps.isDisabled;

  delete prevButtonProps.isDisabled;
  delete nextButtonProps.isDisabled;

  function handleOnTodayClick() {
    state.selectDate(today(getLocalTimeZone()));
  }

  return (
    <Box {...calendarProps}>
      <CalendarHeader>
        <Button {...prevButtonProps} disabled={prevButtonDisabled} auto shadow size="sm">
          &lsaquo;
        </Button>
        <Text>{title}</Text>
        <Button {...nextButtonProps} disabled={nextButtonDisabled} auto shadow size="sm">
          &rsaquo;
        </Button>
      </CalendarHeader>
      <CalendarGrid state={state} />
      <CalendarFooter>
        <Button auto shadow size="sm" onPress={handleOnTodayClick}>
          {todayLabel}
        </Button>
      </CalendarFooter>
    </Box>
  );
}
