import moment from 'moment'
import { DATE_FORMAT, TIME_FORMAT } from 'constants/common'

interface DateUnixProps {
  value: string
}

const DateUnix = ({ value }: DateUnixProps): string => {
  const isToday = moment(value).isSame(new Date(), 'day')

  return value ? moment(value).format(isToday ? TIME_FORMAT : DATE_FORMAT) : '-'
}

export default DateUnix
