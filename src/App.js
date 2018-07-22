import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Container, Card, Item, Image } from 'semantic-ui-react';
import User from './components/User';

import logo from './logo.svg';
import './App.css';
import Route from './components/Route';

const style = {
  h1: {
    marginTop: '1em',
  },
};
class App extends Component {
  static propTypes = {
    users: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
  };
  render() {
    const { users, routes } = this.props;

    return (
      <div className="App">
        <Header as="h1" textAlign="center" style={style.h1}>
          <Image src={logo} className="App-logo" alt="logo" />
          Range Project
        </Header>
        <Header as="h3" textAlign="center">
          Friends
        </Header>
        <Container>
          <Card.Group centered>
            {Object.keys(users).map(id => <User key={id} {...users[id]} />)}
          </Card.Group>
        </Container>
        <Header as="h3" textAlign="center">
          Completed Routes
        </Header>
        <Container>
          <Item.Group divided>
            {Object.keys(routes).map(id => <Route key={id} {...routes[id]} />)}
          </Item.Group>
        </Container>
      </div>
    );
  }
}

export default App;
