import App from "./App.m";
import * as React from 'react';
import { render } from 'react-dom';

Meteor.startup(function() {
  render(<App />, document.getElementById('main'));
});
