import React from 'react';
import { Card, Image } from 'semantic-ui-react';

const User = props => (
  <Card onClick={props.onClick}>
    <Card.Content>
      <Image floated="right" size="mini" circular src={props.avatar} />
      <Card.Header>{props.name}</Card.Header>
    </Card.Content>
  </Card>
);

export default User;
