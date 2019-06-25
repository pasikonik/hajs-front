import Component from '@ember/component';

export default class PaymentCell extends Component {
  tagName = 'td';

  click() {
    this.change(this.payment);
  }
}
