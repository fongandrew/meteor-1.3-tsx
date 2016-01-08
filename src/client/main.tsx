/// <reference path="../../typings/react/react-dom.d.ts" />
/// <reference path="../../typings/meteor/meteor.d.ts" />
import { render } from 'react-dom';
import App from './app';

Meteor.startup(function () {
  // Use Meteor.startup to render the component after the page is ready
  render(<App />, document.getElementById("render-target"));
});
