import Ember from 'ember';
import ClickOutside from '../mixins/click-outside';
import layout from '../templates/components/click-outside';
import $ from 'jquery';
const { Component, on, get } = Ember;
const { next } = Ember.run;

export default Component.extend(ClickOutside, {
  layout,

  clickOutside(e) {
    const exceptSelector = this.attrs && this.attrs['except-selector'] || get(this, 'except-selector');
    if (exceptSelector && $(e.target).closest(exceptSelector).length > 0) {
      return;
    }

    this.sendAction();
  },

  _attachClickOutsideHandler: on('didInsertElement', function() {
    next(this, this.addClickOutsideListener);
  }),

  _removeClickOutsideHandler: on('willDestroyElement', function() {
    this.removeClickOutsideListener();
  })
});
