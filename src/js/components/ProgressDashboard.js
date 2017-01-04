import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Meter from 'grommet/components/Meter';
import Value from 'grommet/components/Value';
import Status from 'grommet/components/icons/Status';
import Label from 'grommet/components/Label';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';

export default class ProgressDashboard extends Component {
  constructor () {
    super();
    this.state = { progress1: 60,
      progress2: 20,
      progress3: 8
    }
    this.update_time = this.update_time.bind(this, this.state);
  }

  componentDidMount () {
    this.interval = setInterval(this.update_time, 1000);
  }

  update_time () {
    if (this.state.progress1 < 99) {
      var count1 = this.state.progress1 + 1;
    }
    else {
      var count1 = 100;
    }
    if (this.state.progress2 < 95) {
      var count2 = this.state.progress2 + 5;
    }
    else {
      var count2 = 100;
    }
    if (this.state.progress3 < 85) {
      var count3 = this.state.progress3 + 15;
    }
    else {
      var count3 = 100;
    }
    this.setState({ progress1: count1 });
    this.setState({ progress2: count2 });
    this.setState({ progress3: count3 });
  }

  render () {
    var count = this.state.progress1;
    return (
      <Box>
        <List selectable={true}
          >
          <ListItem justify="between"
            separator="horizontal">
            <span>
              DeepMNIST
            </span>
            <span className="secondary">
              <Box align="end">
                <Value value={this.state.progress1}
                  units="%"
                  size="medium"
                  align="end" />
                <Meter vertical={false}
                  size="medium"
                  value={this.state.progress1} />
              </Box>
            </span>
          </ListItem>
          <ListItem justify="between">
            <span>
              BGGNet
            </span>
            <span className="secondary">
            <Box align="end">
              <Value value={this.state.progress2}
                units="%"
                size="medium"
                align="end" />
              <Meter vertical={false}
                size="medium"
                value={this.state.progress2} />
            </Box>
            </span>
          </ListItem>
          <ListItem justify="between">
            <span>
              AtariDeepQLearning
            </span>
            <span className="secondary">
            <Box align="end">
              <Value value={this.state.progress3}
                units="%"
                size="medium"
                align="end" />
              <Meter vertical={false}
                size="medium"
                value={this.state.progress3} />
            </Box>
            </span>
          </ListItem>
        </List>

      </Box>
    );
  }

  componentWillUnmount () {
    clearInterval(this.interval);
  }
}
