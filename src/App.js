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
  };
  static defaultProps = {
    users: {},
    routes: {},
  };
  toggleUserFilter = id => {
    const { filteredUsers } = this.state;

    if (filteredUsers.has(id)) {
      filteredUsers.delete(id);
    } else {
      filteredUsers.add(id);
    }

    this.setState({
      filteredUsers,
    });
  };
  render() {
    const { users, routes } = this.props;
    const { filteredUsers } = this.state;

    // TODO: Do this at data fetching layer instead
    // Key Tick by user ID
    const ticks = Object.keys(users).reduce((acc, userId) => {
      acc[userId] = users[userId].ticks.reduce(
        (ticksById, tick) => ({
          ...ticksById,
          [tick.routeId]: tick,
        }),
        {},
      );
      return acc;
    }, {});

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
        <Header as="h3" textAlign="center">
          Friends
        </Header>
        <Container>
          <Card.Group centered>
            {Object.keys(users).map(id => (
              <User
                onClick={() => this.toggleUserFilter(id)}
                key={id}
                {...users[id]}
              />
            ))}
          </Card.Group>
        </Container>
        <Header as="h3" textAlign="center">
          Completed Routes
        </Header>
        <Container>
          <Item.Group divided>
            {[...filteredRouteIds].map(id => (
              <Route
                key={id}
                completedBadges={Object.keys(users)
                  .filter(userId => ticks[userId].hasOwnProperty(id))
                  .map(userId => (
                    <Image circular key={userId} src={users[userId].avatar} />
                  ))}
                {...routes[id]}
              />
            ))}
          </Item.Group>
        </Container>
      </div>
    );
  }
}

export default App;
