import React, { Component } from 'react';
import Sidebar from 'grommet/components/Sidebar';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';

export default class NavSidebar extends Component {
  constructor () {
    super();
  }
  render () {
    return (
      <Sidebar colorIndex="light-2" size="small" fixed={true}>
        <Header pad="medium"
          justify="between">
          <Title>
            Machines
          </Title>
        </Header>
        <Menu primary={true} fill={true}>
          <Anchor href="#"
            className="active">
            AWS
          </Anchor>
          <Anchor href="#">
            Workstation
          </Anchor>
          <Anchor href="#">
            Home
          </Anchor>
        </Menu>
      </Sidebar>
    );
  }
}
