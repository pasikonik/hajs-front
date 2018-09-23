import Component from '@ember/component';

export default Component.extend({
  tagName: 'td',

  click() {
    this.change(this.rent);
  }
});
