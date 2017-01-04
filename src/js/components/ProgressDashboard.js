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
  }
  render () {
    return (
      <Box>
        <List selectable={true}
          >
          <ListItem justify="between"
            separator="horizontal">
            <span>
              Task 1
            </span>
            <span className="secondary">
              <Box align="end">
                <Value value={40}
                  units="%"
                  size="medium"
                  align="end" />
                <Meter vertical={false}
                  size="medium"
                  value={40} />
              </Box>
            </span>
          </ListItem>
          <ListItem justify="between">
            <span>
              Task 2
            </span>
            <span className="secondary">
            <Box align="end">
              <Value value={84}
                units="%"
                size="medium"
                align="end" />
              <Meter vertical={false}
                size="medium"
                value={84} />
            </Box>
            </span>
          </ListItem>
          <ListItem justify="between">
            <span>
              Task 3
            </span>
            <span className="secondary">
            <Box align="end">
              <Value value={20}
                units="%"
                size="medium"
                align="end" />
              <Meter vertical={false}
                size="medium"
                value={20} />
            </Box>
            </span>
          </ListItem>
        </List>

      </Box>
    );
  }
}
