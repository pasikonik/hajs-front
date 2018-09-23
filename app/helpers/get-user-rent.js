import { helper } from '@ember/component/helper';
import moment from 'moment';

export function getUserRent([rents, month]) {
  return rents.find((rent) => {
    return moment(rent.createdAt).format('MM YYYY') === month;
  });
}

export default helper(getUserRent);
