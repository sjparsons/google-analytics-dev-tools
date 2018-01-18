import React, { Component } from 'react';
import './App.css';
import {initEvents, stopEvents} from './initEvents';
import Events from './Events';

class App extends Component {
  state = {
    events: []
  }

  componentDidMount() {
    this.listener = initEvents(this.addEvent);
  }

  componentWillUnmount() {
    stopEvents(this.listener);
  }

  addEvent = (event) => {
    this.setState(({events}) => ({events: events.concat(event)}));
  }

  clearEvents = () => {
    this.setState({events: []});
  }

  render() {
    return (
      <div>
        <button onClick={this.clearEvents}>Clear Events</button>
        <Events events={this.state.events} />
      </div>
    );
  }
}

export default App;
