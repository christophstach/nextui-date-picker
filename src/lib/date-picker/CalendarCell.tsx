import { useRef } from 'react';
import { useCalendarCell } from '@react-aria/calendar';
import { CalendarState } from '@react-stately/calendar';
import { CalendarDate } from '@internationalized/date';

import Box from '../shared/Box';

export interface CalendarCellProps {
  state: CalendarState;
  date: CalendarDate;
  currentMonth: CalendarDate;
}

export default function CalendarCell(props: CalendarCellProps) {
  const { state, date } = props;

  const ref = useRef(null);
  const { cellProps, buttonProps, isSelected, formattedDate, isDisabled, isOutsideVisibleRange } = useCalendarCell(
    { date },
    state,
    ref
  );

  return (
    <Box as="td" {...cellProps} css={{ textAlign: 'center' }}>
      <Box
        {...buttonProps}
        ref={ref}
        hidden={isOutsideVisibleRange}
        css={{
          width: '2rem',
          height: '2rem',
          outline: 'none',
        }}
      >
        <Box
          css={{
            fontSize: '$sm',
            width: '100%',
            height: '100%',
            borderRadius: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isDisabled ? '$gray500' : isSelected ? '$white' : undefined,
            cursor: !isDisabled ? 'pointer' : 'default',
            backgroundColor: isSelected ? '$primary' : undefined,
            border: isSelected ? '2px solid $primaryBorder' : undefined,
          }}
        >
          {formattedDate}
        </Box>
      </Box>
    </Box>
  );
}
