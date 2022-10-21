import { useCalendarGrid } from '@react-aria/calendar';
import { getWeeksInMonth, endOfMonth } from '@internationalized/date';
import { useLocale } from '@react-aria/i18n';
import { CalendarState } from '@react-stately/calendar';

import CalendarCell from './CalendarCell';

export interface CalendarGridProps {
  state: CalendarState;
  offset?: {};
}

export default function CalendarGrid(props: CalendarGridProps) {
  const { state, offset = {} } = props;

  const { locale } = useLocale();
  const startDate = state.visibleRange.start.add(offset);
  const endDate = endOfMonth(startDate);
  const { gridProps, headerProps, weekDays } = useCalendarGrid(
    {
      startDate,
      endDate,
    },
    state
  );

  const weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale);

  return (
    <table {...gridProps}>
      <thead {...headerProps}>
        <tr>
          {weekDays.map((day, index) => (
            <th key={index}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
          <tr key={weekIndex}>
            {state
              .getDatesInWeek(weekIndex, startDate)
              .map((date, i) =>
                date ? <CalendarCell key={i} state={state} date={date} currentMonth={startDate} /> : <td key={i} />
              )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
