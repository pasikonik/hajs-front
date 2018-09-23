import { helper } from '@ember/component/helper';
import moment from 'moment';

export function currentMonth() {
  return moment().format('MMMM');
}

export default helper(currentMonth);
