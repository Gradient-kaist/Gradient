import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Status from 'grommet/components/icons/Status';
import CircleDashboard from './CircleDashboard';
import ProgressDashboard from './ProgressDashboard';

function getLabel(label, count, colorIndex) {
  return {
    "label": label,
    "value": count,
    "colorIndex": colorIndex
  };
}

export default class TodoAppDashboard extends Component {

  constructor () {
    super();
    this.state = {
      tasks: [
        {
          status: 'critical',
          item: 'Pay my rent.'
        },
        {
          status: 'ok',
          item: 'Walk with my dog this morning.'
        },
        {
          status: 'warning',
          item: 'San Jose Earthquakes game is tomorrow.'
        },
        {
          status: 'ok',
          item: 'Review Pull Request #45.'
        }
      ]
    };
  }

  render () {

    let tasksMap = {
      critical: 0,
      ok: 0,
      warning: 0
    };

    let tasks = this.state.tasks.map((task, index) => {

      tasksMap[task.status] += 1;

      let separator;
      if (index === 0) {
        separator = 'horizontal';
      }
      return (
        <ListItem key={`task_${index}`} separator={separator}
          responsive={false}>
          <Box>
            <Status value={task.status} size='small' />
            <span>{task.item}</span>
          </Box>
        </ListItem>
      );
    }, this);

    const series = [
      getLabel('Past Due', tasksMap.critical, 'critical'),
      getLabel('Due Soon', tasksMap.warning, 'warning'),
      getLabel('Done', tasksMap.ok, 'ok')
    ];

    let value, label;
    if (this.state.index >= 0) {
      value = series[this.state.index].value;
      label = series[this.state.index].label;
    } else {
      value = 0;
      series.forEach(serie => value += serie.value);
      label = 'Total';
    }

    return (
      <Box direction='column'>
        <Box primary={true} flex={true} pad={'large'} direction='column'>
          <Heading tag={'h2'} margin={'medium'}> Memory Usage </Heading>
          <CircleDashboard />
        </Box>
        <Box pad={'large'} direction='column'>
          <Heading tag={'h2'} margin={'medium'}> Running Tasks </Heading>
          <ProgressDashboard />
        </Box>
      </Box>
    );
  }
};
