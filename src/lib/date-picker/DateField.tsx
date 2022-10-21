import { ReactNode, useRef } from 'react';
import { useLocale } from '@react-aria/i18n';
import { useDateFieldState, DateSegment as IDateSegment } from '@react-stately/datepicker';
import { useDateField, useDateSegment } from '@react-aria/datepicker';
import { createCalendar } from '@internationalized/date';
import { DateFieldState } from '@react-stately/datepicker';
import { AriaDateFieldProps } from 'react-aria';
import { DateValue } from '@react-types/datepicker';
import { styled } from '@nextui-org/react';

import Box from '../shared/Box';

const Field = styled('div', {
  display: 'flex',
  justifyItems: 'center',
  alignItems: 'center',
  height: '40px',
  padding: '4px 10px',
  background: '$accents0',
  borderRadius: '$md',
  minWidth: '250px',
});

interface DateFieldProps extends AriaDateFieldProps<DateValue> {
  contentRight?: ReactNode;
}

export function DateField(props: DateFieldProps) {
  const { contentRight } = props;
  const { locale } = useLocale();
  const state = useDateFieldState({
    ...props,
    locale,
    createCalendar,
  });

  const ref = useRef(null);
  const { fieldProps } = useDateField(props, state, ref);

  return (
    <Field {...fieldProps} ref={ref}>
      {state.segments.map((segment, i) => (
        <DateSegment key={i} segment={segment} state={state} />
      ))}

      <Box css={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'end' }}>{contentRight}</Box>
    </Field>
  );
}

interface DateSegmentProps {
  segment: IDateSegment;
  state: DateFieldState;
}

function DateSegment(props: DateSegmentProps) {
  const { segment, state } = props;
  const ref = useRef(null);
  const { segmentProps } = useDateSegment(segment, state, ref);

  return (
    <Box
      {...segmentProps}
      ref={ref}
      css={{
        ...segmentProps.style,
        width: 'fit-content',
        fontVariantNumeric: 'tabular-nums',
        boxSizing: 'content-box',
        padding: '0 0.5rem',
        borderRadius: '0.125rem',
        textAlign: 'center',
        outline: 'none',
        fontSize: '$sm',
        color: segment.isPlaceholder? '$accents6' : undefined,
        '&:focus': {
          background: '$primary',
          color: '$white',
        },
      }}
    >
      <Box
        as="span"
        aria-hidden="true"
        css={{

          display: !segment.isPlaceholder ? 'none' : 'block',
          minWidth: `${String(segment.placeholder).length}ch`,
          pointerEvents: 'none',
          width: '100%',
          textAlign: 'center',
          fontStyle: 'italic',
        }}
      >
        {segment.placeholder}
      </Box>
      {segment.isPlaceholder ? '' : segment.text}
    </Box>
  );
}
