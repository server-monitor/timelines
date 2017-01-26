
import React from 'react';

import logo from './logo.svg';
import './App.css';

import eventsDataFromFile, { buildSeries, buildSeriesData } from './data/index';
import Events from './data/events';
import Timeline from './components/Timeline';

import Input from './components/Input';
import * as Util from './util/index';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    if (eventsDataFromFile.input) throw Error('eventsDataFromFile should not have input key');

    this.state = {
      doNotUpdate: true,
      incrementalUpdate: true,
      input: {},
      ...eventsDataFromFile,
      options: eventsDataFromFile.forChart
    };

    this.handleChangeGroupSpecifier = this.handleChangeGroupSpecifier.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    // const events = new Events({ groupUrlname: 'LearnTeachCode' });
    // // 'la-fullstack' 'LearnTeachCode' 'laruby'

    // const pastEvents = events.past({
    //   // 11th 1474507800000
    //   // stop_if_date_greater_than: 1474507800000,
    //   // stop_if_date_less_than: event.time,
    //   // desc: true
    // });

    // pastEvents.then((muEvents) => {
    //   console.log(muEvents);
    //   this.setState({ muEvents: muEvents });
    // });

    const lastEvents = this.state.eventsDataFromFile.map(({ main, pastEvents }) => {
      return {
        urlname: main.body.urlname,
        event: pastEvents[pastEvents.length - 1]
      };
    });

    this.state.options.series.forEach((series, ix) => {
      const { urlname, event } = lastEvents[ix];

      const events = new Events({ groupUrlname: urlname });
      // 'la-fullstack' 'LearnTeachCode' 'laruby'

      const newestPastEventsListPromise = events.past({
        // 11th 1474507800000
        // stop_if_date_greater_than: 1474507800000,
        stop_if_date_less_than: event.time,
        // desc: true
      });

      newestPastEventsListPromise.then((newestPastEvents) => {
        if (newestPastEvents.length >= 0) {
          const newSeries = this.state.options.series;
          const latest = newestPastEvents.map(ev => buildSeriesData(ev));

          newSeries[ix].data = newSeries[ix].data.concat(latest);

          this.setState({
            ...this.state,

            doNotUpdate: false,
            incrementalUpdate: true,

            options: {
              ...eventsDataFromFile.forChart,
              series: newSeries
            }
          });
        }
      });
    });
  }

  handleChangeGroupSpecifier(e) {
    this.setState({ input: {
      ...this.state.input, inputText: e.target.value
    } });
  }

  handleClick() {
    const { inputText } = this.state.input;
    const groupURLName = Util.extractGroupURLNameFrom(inputText);
    const events = new Events({ groupUrlname: groupURLName });

    const pastEventsPromise = events.past();

    pastEventsPromise.then((pastEvents) => {
      this.setState({
        ...this.state,

        doNotUpdate: false,
        incrementalUpdate: false,
        options: {
          ...eventsDataFromFile.forChart,
          series: buildSeries([{ pastEvents }])
        }
      });

      this.setState({ doNotUpdate: true });
    });
  }

  render() {
    const {
      handleChangeGroupSpecifier,
      handleClick
    } = this;

    const { options, doNotUpdate, incrementalUpdate, isDevEnv, userSession } = this.state;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Meetup Events Timelines</h2>
        </div>

        <Timeline
          options={options}
          doNotUpdate={doNotUpdate}
          incrementalUpdate={incrementalUpdate}
        />

        <Input
          isDevEnv={isDevEnv}
          handleChangeGroupSpecifier={handleChangeGroupSpecifier}
          handleClick={handleClick}
          userSession={userSession}
        />

      </div>
    );
  }
}
