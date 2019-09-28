import Mixin from '@ember/object/mixin';
import { EKMixin, keyDown } from 'ember-keyboard';
import { on } from '@ember/object/evented';

/* eslint-disable ember/no-new-mixins */
export default Mixin.create(EKMixin, {
  activateKeyboard: on('init', function() {
    this.set('keyboardActivated', true);
  }),
  previousMonthEvent: on(keyDown('ArrowLeft'), function() {
    this.send('previousMonth');
  }),
  nextMonthEvent: on(keyDown('ArrowRight'), function() {
    this.send('nextMonth');
  }),
  currentMonthEvent: on(keyDown('ArrowDown'), function() {
    this.send('currentMonth');
  }),
});
/* eslint-enable ember/no-new-mixins */
