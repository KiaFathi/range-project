import React from 'react';
import { Item, ImageGroup } from 'semantic-ui-react';

const Route = props => (
  <Item>
    <Item.Image src={props.imgSmall} />
    <Item.Content>
      <Item.Header as="p">{props.name}</Item.Header>
      <Item.Content>
        <Item.Meta>{props.type}</Item.Meta>
        {props.rating}
      </Item.Content>
      <Item.Extra>
        Completed By:
        <ImageGroup size="mini">{props.completedBadges}</ImageGroup>
      </Item.Extra>
    </Item.Content>
  </Item>
);

export default Route;
