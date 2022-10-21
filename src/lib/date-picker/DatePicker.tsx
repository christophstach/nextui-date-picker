import { useRef } from 'react';
import { useDatePickerState } from '@react-stately/datepicker';
import { useDatePicker } from '@react-aria/datepicker';
import { CalendarDate } from '@internationalized/date';
import { Button, Popover, styled } from '@nextui-org/react';

import Box from '../shared/Box';
import Calendar from './Calendar';
import CalendarIcon from '../shared/CalendarIcon';
import { DateField } from './DateField';

const Label = styled('label', {
  display: 'block',
  fontSize: '$sm',
  marginBottom: '$xs',
});

export interface DatePickerProps {
  label: string;
  minValue: CalendarDate;
}

export default function DatePicker(props: DatePickerProps) {
  const state = useDatePickerState({
    ...props,
    shouldCloseOnSelect: true,
  });

  const ref = useRef(null);
  const { labelProps, fieldProps, buttonProps, dialogProps, calendarProps, errorMessageProps } = useDatePicker(
    props,
    state,
    ref
  );

  function handleOnClose() {
    state.setOpen(false);
  }

  return (
    <Box css={{ position: 'relative', display: 'inline-flex', flexDirection: 'column' }}>
      <Label {...labelProps} css={{ color: state.validationState === 'invalid' ? '$error' : undefined }}>
        {props.label}
      </Label>
      <DateField
        {...fieldProps}
        contentRight={
          <Button {...buttonProps} animated={false} auto light size="xs">
            <CalendarIcon />
          </Button>
        }
      />

      <Popover {...dialogProps} isBordered disableAnimation isOpen={state.isOpen} onClose={handleOnClose}>
        <Popover.Trigger>
          <Button css={{ visibility: 'hidden', position: 'absolute', bottom: '0', left: '0' }} />
        </Popover.Trigger>
        <Popover.Content css={{ padding: '1rem' }}>
          <Calendar {...calendarProps} />
        </Popover.Content>
      </Popover>
    </Box>
  );
}
