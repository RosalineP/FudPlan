import { FC, ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDown,
    faAngleUp,
    faCheck,
    faChevronCircleLeft,
    faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

interface HeaderProps {
    isCollapsed: boolean;
    toggleCollapse: () => void;
    toggleSelection: () => void;
    sorts: { nameSort: string; expSort: string };
    doSorts: { sortByName: () => void; sortByExp: () => void };
}

export const FoodTableHeader: FC<HeaderProps> = props => {
    const { isCollapsed, toggleCollapse, toggleSelection, sorts, doSorts } = props;
    const { nameSort, expSort } = sorts;
    const { sortByName, sortByExp } = doSorts;

    const checkMark = (): ReactElement => (
        <div className="ft__cell checkmarkCell">
            <FontAwesomeIcon className="icon clickable" icon={faCheck} size="lg" onClick={() => toggleSelection()} />
        </div>
    );

    const icon = <div className="ft__cell iconCell"> </div>;

    const name = (): ReactElement => (
        <div className="ft__cell nameCell">
            <div onClick={() => sortByName()}>
                name
                <FontAwesomeIcon className="icon clickable" icon={nameSort === 'asc' ? faAngleUp : faAngleDown} />
            </div>
        </div>
    );

    const expiry = (): ReactElement => (
        <div className="ft__cell expiryCell">
            <div onClick={() => sortByExp()}>
                expiry
                <FontAwesomeIcon className="icon clickable" icon={expSort === 'asc' ? faAngleUp : faAngleDown} />
            </div>
        </div>
    );

    const collapse = (): ReactElement => (
        <div className="collapseButtonCell ft__cell">
            <FontAwesomeIcon
                className="icon clickable"
                onClick={() => toggleCollapse()}
                icon={isCollapsed ? faChevronCircleLeft : faChevronCircleRight}
                size="lg"
            />
        </div>
    );

    const quantity = (): ReactElement => (
        <div className={classNames('quantityCell ft__cell', { noDisplay: isCollapsed })}>qty</div>
    );

    const unit = (): ReactElement => (
        <div className={classNames('unitCell ft__cell', { noDisplay: isCollapsed })}>unit</div>
    );

    return (
        <div className="ft__row ft__header">
            {checkMark()}
            {icon}
            {name()}
            {expiry()}
            {collapse()}
            {quantity()}
            {unit()}
        </div>
    );
};
