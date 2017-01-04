import React, { Component } from 'react';
import App from 'grommet/components/App';
import Box from 'grommet/components/Box';
import Anchor from 'grommet/components/Anchor';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import Title from 'grommet/components/Title';
import Search from 'grommet/components/Search';
import Sidebar from 'grommet/components/Sidebar';
import Menu from 'grommet/components/Menu';
import Button from 'grommet/components/Button';
import Split from 'grommet/components/Split';
// import Actions from 'grommet/components/Actions';
import NavSidebar from './components/NavSidebar';
import TodoAppDashboard from './components/TodoAppDashboard';

export default class Main extends Component {
  render () {
    return (
      <App centered={false}>
        <Box full={true}>
          <Header splash={false}
            colorIndex="neutral-1"
            size="small"
            float={false}
            pad="medium">
            <Title>
              GRADIENT
            </Title>
            <Box flex={true}
              justify="end"
              direction="row"
              responsive={false}>
              <Search inline={true}
                fill={true}
                size="medium"
                placeHolder="Search"
                dropAlign={{"right": "right"}} />
            </Box>
          </Header>
          <Split separator={false} priority={'right'} flex={'right'}>
            <NavSidebar />
            <TodoAppDashboard />
          </Split>
          <Footer primary={true} appCentered={true} direction="column"
            align="center" pad="small" colorIndex="neutral-1">
            <p>
              Build your ideas with <Anchor href="http://grommet.io"
              target="_blank">Grommet</Anchor>!
            </p>
          </Footer>
        </Box>
      </App>
    );
  }
};
