import React, { useState } from 'react';
import { Button, Nav } from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket, faDoorClosed, faUtensils } from '@fortawesome/free-solid-svg-icons';

import whiteFridge from '../assets/fridge-white.svg';
import greenFridge from '../assets/fridge-green.svg';

library.add(faShoppingBasket, faDoorClosed, faUtensils);

export const SideNav = props => {
    const { setViewType } = props;

    const [fridgeIcon, setFridgeIcon] = useState(greenFridge);

    return (
        <div className="leftPanel">
            <Nav defaultActiveKey="/home" className="leftPanel__navBar">
                <Nav.Item className="leftPanel__umlaut">ü</Nav.Item>

                <Nav.Item className="leftPanel__navIcon" onClick={() => setViewType('shop')}>
                    <FontAwesomeIcon className="leftPanel__icon" icon={faShoppingBasket} size="3x" />
                </Nav.Item>

                <Nav.Item
                    className="leftPanel__navIcon"
                    onClick={() => setViewType('fridge')}
                    onMouseOver={() => setFridgeIcon(whiteFridge)}
                    onMouseOut={() => setFridgeIcon(greenFridge)}
                >
                    <img className="leftPanel__fridgeIcon" src={fridgeIcon} alt="fridge icon" />
                </Nav.Item>

                <Nav.Item className="leftPanel__navIcon" onClick={() => setViewType('recipe')}>
                    <FontAwesomeIcon className="leftPanel__icon" icon={faUtensils} size="3x" />
                </Nav.Item>

                <Nav.Item>
                    <Button bsPrefix="leftPane__logInOut greenButton" onClick={() => alert('todo')}>
                        log out
                    </Button>
                </Nav.Item>
            </Nav>
        </div>
    );
};
