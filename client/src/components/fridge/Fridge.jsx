import { Component, useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faCheck, faChevronCircleRight, faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons';

import { getFoods } from '../../actions';

import { FridgeButtonGroup } from './ButtonGroup';

library.add(faPlus, faEdit, faSquare, faCheckSquare, faCheck, faChevronCircleRight, faChevronCircleLeft);

const classNames = require('classnames');

const images = require.context('../../assets/icons', true);

const FoodActionsBar = props => {
    const { classNames } = props;

    const deleteFood = () => {
        console.log('hey');
    };

    return (
        <div className="foodActionsBar">
            <div className={classNames} onClick={() => deleteFood()}>
                eat
            </div>
            <div className={classNames} onClick={() => deleteFood()}>
                expire
            </div>
        </div>
    );
};

class FoodRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.isChecked,
            icon: '',
            name: '',
            expiry: '',
            quantity: '',
            unit: '',
        };
    }

    tickBox() {
        this.props.onClickReportId();
        this.setState({ checked: !this.state.checked });
    }

    render() {
        const { iconCell, nameCell, expiryCell, isCollapsed, unitCell, quantityCell } = this.props;

        let checkBox;
        if (this.state.checked) {
            checkBox = <FontAwesomeIcon className="icon" icon={['far', 'check-square']} size="lg" />;
        } else {
            checkBox = <FontAwesomeIcon className="icon" icon={['far', 'square']} size="lg" />;
        }

        return (
            <div className="ftRow">
                <div className="ftCell checkmarkCell" onClick={() => this.tickBox()}>
                    {checkBox}
                </div>
                <div className="ftCell iconCell">
                    <img className="foodIcon" src={images(iconCell).default} alt="food icon" />
                </div>
                <div className="ftCell nameCell">{nameCell}</div>
                <div className="ftCell expiryCell">{expiryCell}</div>
                <div className="ftCell collapseButtonCell"> </div>
                <div className={classNames('ftCell', 'quantityCell', { noDisplay: isCollapsed })}>{quantityCell}</div>
                <div className={classNames('ftCell', 'unitCell', { noDisplay: isCollapsed })}>{unitCell}</div>
            </div>
        );
    }
}

class FoodTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedFoods: new Set(),
            isCollapsed: false,
        };
    }

    toggleCollapse = () => {
        this.setState({ isCollapsed: !this.state.isCollapsed });
    };

    reportFoodChecked = id => {
        const oldSet = this.state.checkedFoods;
        let newSet;
        if (oldSet.has(id)) {
            oldSet.delete(id);
            newSet = oldSet;
        } else {
            newSet = oldSet.add(id);
        }
        this.setState({ checkedFoods: newSet });
    };

    generateFoodRows = () => {
        const { foodData, compartmentSelection, infoRefreshed } = this.props;

        if (!infoRefreshed) {
            return <div className="fridge__loadingText"> Loading... </div>;
        }

        const foodRows = foodData
            .filter(food => food.compartment === compartmentSelection)
            .map(food => (
                <FoodRow
                    key={food.id}
                    onClickReportId={() => this.reportFoodChecked(food.id)}
                    isChecked={this.state.checkedFoods.has(food.id)}
                    iconCell={food.icon}
                    nameCell={food.name}
                    expiryCell={food.expiry}
                    quantityCell={food.quantity}
                    unitCell={food.unit}
                    isCollapsed={this.state.isCollapsed}
                />
            ));
        return <div>{foodRows}</div>;
    };

    render() {
        const { isCollapsed, checkedFoods } = this.state;
        const { infoRefreshed, loadFoodsFunction } = this.props;

        const collapsedColumn = { display: 'none' };
        const expandedColumn = {};

        const foodActionsBarClassNames = classNames('foodAction', {
            foodActionEnabled: infoRefreshed && checkedFoods.size > 0,
            foodActionDisabled: !infoRefreshed || checkedFoods.size <= 0,
        });

        return (
            <div className="fridge__tableAndActions">
                <div className="fridge__table noHighlight">
                    <div className="fridgeTable">
                        <div className="ftRow ftHeader">
                            <div className="ftCell checkmarkCell">
                                <FontAwesomeIcon className="icon" icon="check" size="lg" />
                            </div>
                            <div className="ftCell iconCell"> &nbsp; </div>
                            <div className="ftCell nameCell"> name </div>
                            <div className="ftCell expiryCell"> expiry </div>
                            <div className="ftCell collapseButtonCell">
                                <FontAwesomeIcon
                                    className="icon clickable"
                                    onClick={() => this.toggleCollapse()}
                                    icon={isCollapsed ? 'chevron-circle-left' : 'chevron-circle-right'}
                                    size="lg"
                                />
                            </div>
                            <div className="ftCell quantityCell" style={isCollapsed ? collapsedColumn : expandedColumn}>
                                quantity
                            </div>
                            <div className="ftCell unitCell" style={isCollapsed ? collapsedColumn : expandedColumn}>
                                unit
                            </div>
                        </div>
                        {this.generateFoodRows()}
                    </div>
                </div>
                <FoodActionsBar
                    classNames={foodActionsBarClassNames}
                    isActive={(checkedFoods.size > 0).toString()}
                    checkedFoods={checkedFoods}
                    refreshAfterDelete={loadFoodsFunction}
                    deHighlightActions={this.deHighlightActions}
                />
            </div>
        );
    }
}

export class Fridge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            compartmentSelection: 'fridge',
            foodData: [],
            infoRefreshed: false,
        };
    }

    componentDidMount = () => {
        this.loadFoods();
    };

    loadFoods = () => {
        getFoods(foodData => {
            this.setState({ foodData, infoRefreshed: true });
        });
    };

    render() {
        const { compartmentSelection, foodData, infoRefreshed } = this.state;

        return (
            <div className="fridge">
                <FridgeButtonGroup
                    selection={compartmentSelection}
                    loadFoods={this.loadFoods}
                    onClickButton={newSelection => this.setState({ compartmentSelection: newSelection })}
                />
                <FoodTable
                    foodData={foodData}
                    compartmentSelection={compartmentSelection}
                    loadFoodsFunction={getFoods}
                    infoRefreshed={infoRefreshed}
                />
            </div>
        );
    }
}
