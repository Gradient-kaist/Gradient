import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Meter from 'grommet/components/Meter';
import Value from 'grommet/components/Value';
import Status from 'grommet/components/icons/Status';
import Label from 'grommet/components/Label';
import AnnotatedMeter from 'grommet-addons/components/AnnotatedMeter';

export default class CircleDashboard extends Component {
  constructor () {
    super();
  }
  render () {
    return (
      <Box primary={true} flex={true} direction='row'>
        <Box basis='1/4' pad="medium" align="center">
          <Label>
            GPU 1
          </Label>
          <AnnotatedMeter legend={true}
            size="small"
            type="circle"
            series={[
            {"label": "First", "value": 20, "colorIndex": "graph-1"},
            {"label": "Second", "value": 50, "colorIndex": "graph-2"}
            ]} />
        </Box>
        <Box basis='1/4' pad="medium" align="center">
          <Label>
            GPU 2
          </Label>
          <AnnotatedMeter legend={true}
            size="small"
            type="circle"
            series={[
            {"label": "First", "value": 20, "colorIndex": "graph-1"},
            {"label": "Second", "value": 50, "colorIndex": "graph-2"}
            ]} />
        </Box>
        <Box basis='1/4' pad="medium" align="center">
          <Label>
            GPU 3
          </Label>
          <AnnotatedMeter legend={true}
            size="small"
            type="circle"
            series={[
            {"label": "First", "value": 20, "colorIndex": "graph-1"},
            {"label": "Second", "value": 50, "colorIndex": "graph-2"}
            ]} />
        </Box>
        <Box basis='1/4' pad="medium" align="center">
          <Label>
            GPU 4
          </Label>
          <AnnotatedMeter legend={true}
            size="small"
            type="circle"
            series={[
            {"label": "First", "value": 20, "colorIndex": "graph-1"},
            {"label": "Second", "value": 50, "colorIndex": "graph-2"}
            ]} />
        </Box>
      </Box>
    );
  }
}
