import 'babel-polyfill';
import 'jasmine-ajax';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import $ from 'jquery';

Object.assign(global, {
  React, ReactDOM, TestUtils, $
});

const events = ['blur', 'click', 'change', 'focus'];

beforeEach(function () {
  this.$container = $('<div id="container"></div>');
  $(window.document.body).append(this.$container);
  this.render = (element) => {
    return ReactDOM.render(element, this.$container[0]);
  };

  events.forEach((event) => {
    this[event] = (selector, e) => {
      TestUtils.Simulate[event](this.$container.find(selector)[0], e);
    };
  });

  jasmine.addMatchers({
    toBeRendered: () => {
      return {
        compare: (selector) => {
          const result = {};
          const $foundElements = this.$container.find(selector);
          result.pass = $foundElements.length >= 1;
          if(result.pass) {
            result.message = `Expected to find 0 elements with selector ${selector}, but found ${$foundElements.length}`;
          } else {
            result.message = `Expected to find 1 or more elements with selector ${selector}, but found none`;
          }
          return result;
        }
      };
    },

    toBeRenderedOnce: () => {
      return {
        compare: (selector) => {
          const result = {};
          const $foundElements = this.$container.find(selector);
          result.pass = $foundElements.length === 1;
          if(result.pass) {
            result.message = `Expected not to find exactly 1 element with selector ${selector}.`;
          }
          else {
            result.message = `Expected to find exactly 1 element with selector ${selector}, but found ${$foundElements.length}.`;
          }
          return result;
        }
      };
    },

    toBeRenderedTimes: () => {
      return {
        compare: (selector, count) => {
          const result = {};
          const $foundElements = this.$container.find(selector);
          result.pass = $foundElements.length === count;
          if(result.pass) {
            result.message = `Expected not to find exactly ${count} elements with selector ${selector}.`;
          }
          else {
            result.message = `Expected to find exactly ${count} elements with selector ${selector}, but found ${$foundElements.length}.`;
          }
          return result;
        }
      };
    }
  });
});

afterEach(function () {
  this.$container.remove();
});