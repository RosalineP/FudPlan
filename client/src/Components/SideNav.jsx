import React, { Component } from 'react';
import { Button, Nav } from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket, faDoorClosed, faUtensils } from '@fortawesome/free-solid-svg-icons';
import whiteFridge from '../Resources/fridge-white.svg';
import greenFridge from '../Resources/fridge-green.svg';

library.add(faShoppingBasket, faDoorClosed, faUtensils);

export class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = { fridgeIcon: greenFridge };
  }

  render() {
    return (
      <div className="leftPanel">
        <Nav defaultActiveKey="/home" className="leftPanel__navBar">
          <Nav.Item className="leftPanel__umlaut">
            ü
          </Nav.Item>

          <Nav.Item className="leftPanel__navIcon" onClick={() => this.props.setViewType('shop')}>
            <FontAwesomeIcon className="leftPanel__icon" icon={['fas', 'shopping-basket']} size="3x" />
          </Nav.Item>

          <Nav.Item
            className="leftPanel__navIcon"
            onClick={() => this.props.setViewType('fridge')}
            onMouseOver={() => (this.setState({ fridgeIcon: whiteFridge }))}
            onMouseOut={() => (this.setState({ fridgeIcon: greenFridge }))}
          >
            <img className="leftPanel__fridgeIcon" src={this.state.fridgeIcon} alt="fridge icon" />
          </Nav.Item>

          <Nav.Item className="leftPanel__navIcon" onClick={() => this.props.setViewType('recipe')}>
            <FontAwesomeIcon className="leftPanel__icon" icon={['fas', 'utensils']} size="3x" />
          </Nav.Item>

          <Nav.Item>
            <Button bsPrefix="leftPane__logInOut" onClick={() => alert('todo')}> log out</Button>
          </Nav.Item>
        </Nav>
      </div>
    );
  }
}
