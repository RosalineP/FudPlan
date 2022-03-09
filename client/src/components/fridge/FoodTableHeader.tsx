import { FC, ReactNode} from 'react';
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
}

export const FoodTableHeader: FC<HeaderProps> = props => {
    const { isCollapsed } = props;

    const sortingIcon = (sort: string): ReactNode => {
        return (
            <FontAwesomeIcon
                className="icon clickable"
                icon={sort === 'down' ? faAngleUp : faAngleDown}
                // onClick={() => doSort(sort, setSort, column)}
            />
        );
    };

    const checkMark = () => {
        return (
            <div className="ft__cell checkmarkCell">
                <FontAwesomeIcon
                    className="icon clickable"
                    icon={faCheck}
                    size="lg"
                    // onClick={() => toggleAllCheckMarks()}
                />
            </div>
        );
    };

    const icon = () => {
        return (<div className="ft__cell iconCell"> </div>);
    };

    const name = () => {
        return (
            <div className="ft__cell nameCell">
                <div> name {sortingIcon('up')} </div>
            </div>
        );
    };

    const expiry = () => {
        return (
            <div className="ft__cell expiryCell">
                <div> expiry {sortingIcon('up')} </div>
            </div>
        );
    };

    const collapse = () => {
        return (
            <div className="collapseButtonCell ft__cell">
                <FontAwesomeIcon
                    className="icon clickable"
                    // onClick={() => toggleCollapse()}
                    icon={isCollapsed ? faChevronCircleLeft : faChevronCircleRight}
                    size="lg"
                />
            </div>
        );
    };

    const quantity = () => {
        return (<div className={classNames('quantityCell ft__cell', { noDisplay: isCollapsed })}>quantity</div>);
    };

    const unit = () => {
        return (<div className={classNames('unitCell ft__cell', { noDisplay: isCollapsed })}>unit</div>);
    }

    return (
        <div className="ft__row ft__header">
            {checkMark()}
            {icon()}
            {name()}
            {expiry()}
            {collapse()}
            {quantity()}
            {unit()}
        </div>
    );
};
