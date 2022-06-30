import moment from 'moment'
import { TIME_FORMAT } from 'constants/common'

interface TimeUnixProps {
  value: string
}

const TimeUnix = ({ value }: TimeUnixProps): string => {
  return value ? moment.utc(value).format(TIME_FORMAT) : '-'
}

export default TimeUnix
