import React from 'react';
import { Item } from 'semantic-ui-react';

const Route = props => (
  <Item>
    <Item.Image src={props.imgSmall} />
    <Item.Content>
      <Item.Header as="p">{props.name}</Item.Header>
    </Item.Content>
  </Item>
);

export default Route;
