import React from 'react';
import PropTypes from 'prop-types';
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

Route.propTypes = {
  imgSmall: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
  completedBadges: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Route;
