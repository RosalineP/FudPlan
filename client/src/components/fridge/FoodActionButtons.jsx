import { deleteFoods } from '../../actions';

export const FoodActionButtons = props => {
    const { classNames, checkedFoods, isActive, loadFoods, resetCheckedFoods, setError, setBeingEditedFoods } = props;

    const deleteFoodAction = () => {
        if (isActive) {
            deleteFoods({ ids: Array.from(checkedFoods) })
                .then(() => {
                    loadFoods();
                    resetCheckedFoods();
                })
                .catch(() => {
                    setError(true);
                });
        }
    };

    return (
        <div className="foodActionsBar">
            <div className={classNames} onClick={() => deleteFoodAction()}>
                eat
            </div>
            <div
                className={classNames}
                onClick={() => {
                    setBeingEditedFoods(checkedFoods);
                }}
            >
                edit
            </div>
        </div>
    );
};
