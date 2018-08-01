import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Container, Card, Item, Image } from 'semantic-ui-react';

import User from './components/User';
import Route from './components/Route';

import { union } from './utilities/set';

import logo from './logo.svg';
import './App.css';

const style = {
  h1: {
    marginTop: '1em',
  },
};
class App extends Component {
  state = {
    filteredUsers: new Set(),
  };
  static propTypes = {
    users: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
    ticks: PropTypes.object.isRequired,
  };
  static defaultProps = {
    users: {},
    routes: {},
    ticks: {},
  };
  toggleUserFilter = userId => {
    const { filteredUsers } = this.state;

    if (filteredUsers.has(userId)) {
      filteredUsers.delete(userId);
    } else {
      filteredUsers.add(userId);
    }

    this.setState({
      filteredUsers,
    });
  };
  render() {
    const { users, routes, ticks } = this.props;
    const { filteredUsers } = this.state;

    const filteredRouteIds = Object.keys(users)
      .filter(userId => !filteredUsers.has(userId))
      .reduce((acc, userId) => {
        return union(acc, new Set(Object.keys(ticks[userId])));
      }, new Set());

    return (
      <div className="App">
        <Header as="h1" textAlign="center" style={style.h1}>
          <Image src={logo} className="App-logo" alt="logo" />
          Range Project
        </Header>
        <Header as="h2" textAlign="center">
          Friends
        </Header>
        <Container>
          <Card.Group centered>
            {Object.keys(users).map(userId => (
              <User
                active={!filteredUsers.has(userId)}
                onClick={() => this.toggleUserFilter(userId)}
                key={userId}
                {...users[userId]}
              />
            ))}
          </Card.Group>
        </Container>
        <Header as="h2" textAlign="center">
          Completed Routes
        </Header>
        <Container>
          <Item.Group divided>
            {[...filteredRouteIds].map(routeId => (
              <Route
                key={routeId}
                completedBadges={Object.keys(users)
                  .filter(
                    userId =>
                      !filteredUsers.has(userId) &&
                      ticks[userId].hasOwnProperty(routeId),
                  )
                  .sort(userId => filteredUsers.has(userId))
                  .map(userId => (
                    <Image circular key={userId} src={users[userId].avatar} />
                  ))}
                {...routes[routeId]}
              />
            ))}
          </Item.Group>
        </Container>
      </div>
    );
  }
}

export default App;
