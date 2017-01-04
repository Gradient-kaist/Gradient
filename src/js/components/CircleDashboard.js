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
    this.state = {
      gpu1: 45,
      gpu2: 20,
      gpu3: 69,
      gpu4: 10
    }
    this.update_time = this.update_time.bind(this, this.state);
  }

  componentDidMount () {
    this.interval = setInterval(this.update_time, 1000);
  }

  update_time () {
    if (this.state.gpu1 < 50) {
      var count1 = this.state.gpu1 + 3;
    }
    else {
      var count1 = 30;
    }
    if (this.state.gpu2 < 40) {
      var count2 = this.state.gpu2 + 18;
    }
    else {
      var count2 = 100;
    }
    if (this.state.gpu3 > 50) {
      var count3 = this.state.gpu3 - 4;
    }
    else {
      var count3 = 75;
    }
    if (this.state.gpu4 < 22) {
      var count4 = this.state.gpu4 + 5;
    }
    else {
      var count4 = 12;
    }
    this.setState({ gpu1: count1 });
    this.setState({ gpu2: count2 });
    this.setState({ gpu3: count3 });
    this.setState({ gpu4: count4 });
  }
  render () {
    return (
      <Box primary={true} flex={true} direction='row'>
        <Box basis='1/4' pad="medium" align="center">
          <Label>
            GPU 1
          </Label>
          <AnnotatedMeter legend={true}
            size="medium"
            type="circle"
            units={"MB"}
            series={[
            {"label": "Used", "value": 2160, "colorIndex": "graph-1"},
            {"label": "Free", "value": 4096 - 2160, "colorIndex": "graph-2"}
            ]} />
        </Box>
        <Box basis='1/4' pad="medium" align="center">
          <Label>
            GPU 2
          </Label>
          <AnnotatedMeter legend={true}
            size="medium"
            type="circle"
            units={"MB"}
            series={[
            {"label": "Used", "value": 3632, "colorIndex": "graph-1"},
            {"label": "Free", "value": 4096 - 3632, "colorIndex": "graph-2"}
            ]} />
        </Box>
        <Box basis='1/4' pad="medium" align="center">
          <Label>
            GPU 3
          </Label>
          <AnnotatedMeter legend={true}
            size="medium"
            type="circle"
            units={"MB"}
            series={[
            {"label": "Used", "value": 560, "colorIndex": "graph-1"},
            {"label": "Free", "value": 4096 - 560, "colorIndex": "graph-2"}
            ]} />
        </Box>
        <Box basis='1/4' pad="medium" align="center">
          <Label>
            GPU 4
          </Label>
          <AnnotatedMeter legend={true}
            size="medium"
            type="circle"
            units={"MB"}
            series={[
            {"label": "Used", "value": 530, "colorIndex": "graph-1"},
            {"label": "Free", "value": 4096 - 530, "colorIndex": "graph-2"}
            ]} />
        </Box>
      </Box>
    );
  }
}
