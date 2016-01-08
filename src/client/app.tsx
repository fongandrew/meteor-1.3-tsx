/// <reference path="../../typings/react/react.d.ts" />
import { Component } from 'react';

export default class App extends Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        Hello world
      </div>
    );
  }
};
