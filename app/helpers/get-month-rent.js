import { helper } from '@ember/component/helper';
import moment from 'moment';

export async function getMonthRent([rents, month]) {
  return rents.find((rent) => {
    // debugger
    return moment(rent.createdAt.format('MM YYYY')) === month;
  });
}

export default helper(getMonthRent);
