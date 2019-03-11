import { helper } from '@ember/component/helper';

export function userBillPayment([payments, user]) {
  return payments.find((payment) => {
    return payment.get('user.id') === user.get('id');
  });
}

export default helper(userBillPayment);
