import React, { FC, memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket, faUtensils, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames';

import greenFridge from '../assets/fridge-green.svg';

interface Props {
    setViewType: (viewType: string) => void;
    viewType: string;
}

export const NavBar: FC<Props> = memo(props => {
    const { viewType, setViewType } = props;

    const styling = (viewTypeComparison: string): string => {
        return classNames('navBar__option clickable', { navBar__selectedOption: viewType === viewTypeComparison });
    };

    return (
        <div className="navBar">
            <div className="navBar__umlaut noHighlight">ü</div>

            <div className={styling('shop')} onClick={() => setViewType('shop')}>
                <FontAwesomeIcon icon={faShoppingBasket} size="3x" />
            </div>

            <div className={styling('fridge')} onClick={() => setViewType('fridge')}>
                <img className="navBar__fridgeIcon noHighlight" src={greenFridge} alt="fridge icon" />
            </div>

            <div className={styling('recipe')} onClick={() => setViewType('recipe')}>
                <FontAwesomeIcon icon={faUtensils} size="3x" />
            </div>

            <div className="navBar__info" onClick={() => setViewType('info')}>
                <FontAwesomeIcon className="navBar__info__icon clickable" icon={faInfoCircle} size="2x" />
            </div>
        </div>
    );
});
