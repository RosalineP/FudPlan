import React, {FC, memo, useState} from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FoodTable } from './FoodTable1';

interface Props {
    selection: string;
    onClick: (newSelection: string) => void;
    setError: (error: string) => void;
}

export const CompartmentButtonGroup: FC<Props> = memo(props => {
    const { selection, onClick } = props;

    const compartments = ['freezer', 'fridge', 'pantry'];
    const style = compartments.map(compartment => [
        'clickable',
        'compartmentBtnGroup__greenButton',
        'compartmentBtnGroup__' + compartment,
        { compartmentBtnGroup__selectedButton: selection === compartment },
    ]);

    return (
        <span>
            <button className={classNames(...style[0])} onClick={() => onClick(compartments[0])}>
                freezer
            </button>
            <button className={classNames(...style[1])} onClick={() => onClick(compartments[1])}>
                fridge
            </button>
            <button className={classNames(...style[2])} onClick={() => onClick(compartments[2])}>
                pantry
            </button>
        </span>
    );
});

export const Fridge: FC = memo(() => {
    const [compartmentSelection, setCompartmentSelection] = useState<string>('fridge');
    const [isPopOverOpen, setIsPopOverOpen] = useState(false);
    const [error, setError] = useState('');

    return (
        <div className="fridge">
            <div className="compartmentBtnGroup">
                <CompartmentButtonGroup
                    selection={compartmentSelection}
                    onClick={setCompartmentSelection}
                    setError={setError}
                />
                <FontAwesomeIcon
                    onClick={() => setIsPopOverOpen(!isPopOverOpen)}
                    className="compartmentBtnGroup__addIcon clickable"
                    icon={faPlus}
                    size="lg"
                />
            </div>

            <FoodTable
                compartmentSelection={compartmentSelection}
                error={error}
                setError={setError}
            />
        </div>
    );
});
