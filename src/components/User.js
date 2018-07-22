import React from 'react';
import { Card, Image } from 'semantic-ui-react';

export default props => (
  <Card>
    <Card.Content>
      <Image floated="right" size="mini" src={props.avatar} />
      <Card.Header>{props.name}</Card.Header>
    </Card.Content>
  </Card>
);
