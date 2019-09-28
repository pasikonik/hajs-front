import Component from '@ember/component';
import { action } from '@ember/object';

export default class BillModal extends Component {
  @action
  createBill(newBill) {
    this.createNewBill(newBill);
  }
}
