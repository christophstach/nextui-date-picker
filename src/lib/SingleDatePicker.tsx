import { Input, InputProps, Button, Modal, ModalProps, styled, Popover, Text } from '@nextui-org/react';
import { useState } from 'react';
import { useLilius } from 'use-lilius';
import { addDays, isSameMonth, nextMonday, isToday, format } from 'date-fns';

import ChevronLeftIcon from './ChevronLeftIcon';
import ChevronRightIcon from './ChevronRightIcon';
import CalendarIcon from './CalendarIcon';

const Box = styled('div', {});

const Calendar = styled('div', {
  padding: '1rem',
});

const CalendarHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingBottom: '1rem',
  gap: '0.5rem',
});

const CalendarWeeks = styled('div', {
  display: 'flex',
  gap: '0.5rem',
  flexDirection: 'column',
});

const CalendarFooter = styled('div', {
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: '1rem',
});

export interface SingleDatePickerProps {
  todayLabel?: 'string';
  clearLabel?: 'string';
  dateFormat?: string;
  inputProps?: Partial<InputProps>;
  modalProps?: Partial<ModalProps>;
}

export default function SingleDatePicker(props: SingleDatePickerProps) {
  const { dateFormat = 'dd.MM.yyyy', todayLabel = 'Today', clearLabel = 'Clear', modalProps, inputProps } = props;
  const [open, setOpen] = useState(false);

  const {
    calendar,
    clearSelected,
    clearTime,
    inRange,
    isSelected,
    select,
    selected,
    setViewing,
    toggle,
    viewing,
    viewNextMonth,
    viewPreviousMonth,
    viewToday,
  } = useLilius();

  function handleOnInputClick() {
    setOpen(true);
  }

  function handleOnClose() {
    setOpen(false);
  }

  function handleOnTodayClick() {
    select(clearTime(new Date()), true);
    setOpen(false);
  }

  function handleOnTomorrowClick() {
    select(addDays(clearTime(new Date()), 1), true);
    setOpen(false);
  }

  function handleOnNextMondayClick() {
    select(nextMonday(clearTime(new Date())), true);
    setOpen(false);
  }

  function handleOnDateClick(date: Date) {
    select(date, true);
    setOpen(false);
  }

  return (
    <Box css={{position: 'relative'}}>
      <Button.Group>
        <Input
          {...inputProps}
          contentRight={
            <Box>
               <CalendarIcon size="1rem" />
            </Box>
         }
          value={selected.length === 1 ? format(selected[0], dateFormat) : ''}
          onClick={handleOnInputClick}
        />
      </Button.Group>

      <Popover isBordered disableAnimation placement="bottom" isOpen={open} onOpenChange={setOpen}>
        <Popover.Trigger>
          <Button css={{  visibility: 'hidden', position: 'absolute', bottom: '0', left: '0' }} />
        </Popover.Trigger>
        <Popover.Content>
          <Calendar>
            <CalendarHeader>
              <Box>
                <Button auto shadow size="sm" onClick={viewPreviousMonth}>
                  &lsaquo;
                </Button>
              </Box>

              <Text>{format(viewing, 'MMMM yyyy')}</Text>

              <Box>
                <Button auto shadow size="sm" onClick={viewNextMonth}>
                  &rsaquo;
                </Button>
              </Box>
            </CalendarHeader>

            <CalendarWeeks>
              {calendar[0].map((week, weekIndex) => {
                return (
                  <Box key={weekIndex} css={{ display: 'flex', gap: '0.5rem' }}>
                    {week.map((date, dateIndex) => {
                      return (
                        <Box key={dateIndex}>
                          <Box
                            href="#"
                            as="a"
                            css={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '2rem',
                              height: '2rem',
                              textAlign: 'center',
                              borderRadius: '0.5rem',
                              color: isSameMonth(date, viewing) ? '$white' : '$accents5',
                              border: isToday(date) ? '2px solid $neutralBorder' : '',
                              background: isSelected(date) ? '$primary' : '',
                            }}
                            onClick={() => handleOnDateClick(date)}
                          >
                            {date.getDate()}
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                );
              })}
            </CalendarWeeks>
            <CalendarFooter>
              <Button auto shadow size="sm" onPress={handleOnTodayClick}>
                {todayLabel}
              </Button>
              <Button auto shadow size="sm" onPress={clearSelected}>
                {clearLabel}
              </Button>
            </CalendarFooter>
          </Calendar>
        </Popover.Content>
      </Popover>
    </Box>
  );
}
