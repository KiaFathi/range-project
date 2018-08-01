import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'semantic-ui-react';
import './User.css';

const User = props => (
  <Card
    raised={props.active}
    className={`User--Card__${props.active ? 'active' : 'disabled'}`}
    onClick={props.onClick}
  >
    <Card.Content>
      <Image floated="right" size="mini" circular src={props.avatar} />
      <Card.Header>{props.name}</Card.Header>
      <Card.Meta>Average: {props.average}</Card.Meta>
      <Card.Meta>Hardest: {props.hardest}</Card.Meta>
    </Card.Content>
  </Card>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
  average: PropTypes.string.isRequired,
  hardest: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  avatar: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};

export default User;
