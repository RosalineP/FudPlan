import { FC, memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';

// todo: Make use of errorMsg, and then style

interface ErrorProps {
    errorMsg: string;
}
export const ErrorDisplay: FC<ErrorProps> = memo(props => {
    const { errorMsg } = props;

    return (
        <>
            <div className="error__display">
                <FontAwesomeIcon icon={faSkullCrossbones} size="10x" />
                <div className="error__text">
                    <div> öops; please refresh </div>
                </div>
            </div>
        </>
    );
});
