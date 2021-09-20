import {Component} from "react";
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus, faEdit, faCheck, faChevronCircleRight, faChevronCircleLeft} from '@fortawesome/free-solid-svg-icons'
import {faSquare, faCheckSquare} from '@fortawesome/free-regular-svg-icons'
import {getFoods} from "../actions";
library.add(faPlus, faEdit, faSquare, faCheckSquare, faCheck, faChevronCircleRight, faChevronCircleLeft)

class FridgeButton extends Component {
    render() {
        const storageCategory = this.props.storageCategory;
        const selection = this.props.selection
        const styling = storageCategory === "freezer" ? "fridge__btnGroupLeft" : storageCategory === "fridge" ? "fridge__btnGroupMiddle" : "fridge__btnGroupRight";

        return (
            <Button
                bsPrefix={"greenButton " + styling}
                style={selection === storageCategory ? {backgroundColor: '#a4de02', color: 'white'} : {display : ''}}
                onClick={() => this.props.onClickButton(storageCategory)}
            >
                {storageCategory}
            </Button>
        );
    }
}

class FridgeButtonGroup extends Component {
    constructor(props){
        super(props);
        this.state = {isPopOverOpen: false};
    }

    render() {
        const {selection, onClickButton} = this.props;

        return(
            <ButtonGroup size="lg" aria-label="compartment navigation" className="fridge__buttonGroup noHighlight">
                <FridgeButton storageCategory={"freezer"} selection={selection} onClickButton={onClickButton} />
                <FridgeButton storageCategory={"fridge"} selection={selection} onClickButton={onClickButton} />
                <FridgeButton storageCategory={"pantry"} selection={selection} onClickButton={onClickButton} />

                <FontAwesomeIcon
                    onClick={() => this.setState({isPopOverOpen: !this.state.isPopOverOpen})}
                    className="icon fridge__addIcon" icon='plus' size="lg"
                />
                {/*{this.state.isPopOverOpen && <AddFood refreshAfterAdd={this.props.refreshAfterAdd}/>}*/}

            </ButtonGroup>);
    }
}

class FoodActionsBar extends Component{
    deleteFood = () => {

    }

    render(){
        return(
            <div className="foodActionsBar">
                <div className="foodAction" style={this.props.actionStyle} onClick={() => this.deleteFood()}> eat </div>
                <div className="foodAction" style={this.props.actionStyle} onClick={() => this.deleteFood()}> expire </div>
            </div>

        );
    }
}

class FoodRow extends Component{
    constructor(props){
        super(props);
        this.state = {
            checked: this.props.isChecked,
            icon: "",
            name: "",
            expiry: "",
            quantity: "",
            unit: ""
        };

    }

    tickBox(){
        this.props.onClickReportId()
        this.setState({checked: !this.state.checked})

    }

    isCollaspedStyle(){
        let collapsedColumn = {display: "none"};
        let expandedColumn = {};
        if (this.props.isCollapsed){
            return collapsedColumn;
        } else {
            return expandedColumn;
        }
    }

    render(){
        let checkBox;
        if (this.state.checked){
            checkBox = <FontAwesomeIcon className="icon" icon={['far', 'check-square']} size="lg"/>;
        } else {
            checkBox = <FontAwesomeIcon className="icon" icon={['far', 'square']} size="lg"/>;
        }

        const images = require.context('./Icons', true);

        return( <div className="ftRow">
                <div className="ftCell checkmarkCell" onClick={() => this.tickBox()}> {checkBox} </div>
                <div className="ftCell iconCell"> <img className="foodIcon" src={ images(this.props.iconCell).default } alt="food icon" /> </div>
                <div className="ftCell nameCell"> {this.props.nameCell} </div>
                <div className="ftCell expiryCell"> {this.props.expiryCell} </div>
                <div className="ftCell collapseButtonCell"> </div>
                <div className="ftCell quantityCell" style={this.isCollaspedStyle()}> {this.props.quantityCell} </div>
                <div className="ftCell unitCell" style={this.isCollaspedStyle()}> {this.props.unitCell} </div>
                <div className="ftCell priceCell" style={this.isCollaspedStyle()}> {this.props.priceCell} </div>
            </div>
        );
    }
}

class FoodTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedFoods: new Set(),
            isCollapsed: false
        };
    }

    toggleCollapse = () => {
        this.setState({isCollapsed: !this.state.isCollapsed})
    }

    reportFoodChecked = (id) => {
        let oldSet = this.state.checkedFoods
        let newSet;
        if (oldSet.has(id)){
            oldSet.delete(id)
            newSet = oldSet
        } else {
            newSet = oldSet.add(id)
        }
        this.setState({checkedFoods: newSet})
    }

    // ToDo: Use better styling package
    foodActionStyles = () => {
        let activeStyle = {
            color: "#a4de02",
            border: "3px solid #a4de02",
            cursor: "pointer"
        };
        let disabledStyle = {
            color: "#C0C5CE",
            border: "3px dotted #C0C5CE"
        }

        let currentChecks = this.state.checkedFoods;
        if (currentChecks.size === 0){
            return disabledStyle
        } else {
            return activeStyle
        }
    }

    generateFoodRows = () => {
        let data = this.props.foodData;
        if (data.length < 1){
            return;
        }
        console.log("generateFoodRows data", data);
        const foodRows = data.map((food) =>
            <FoodRow
                key={food._id}
                onClickReportId={() => this.reportFoodChecked(food._id)}
                isChecked={this.state.checkedFoods.has(food._id)}
                iconCell={food.icon}
                nameCell={food.name}
                expiryCell={food.expiry}
                quantityCell={food.quantity}
                unitCell={food.unit}
                priceCell={food.price}
                isCollapsed={this.state.isCollapsed}
            />
        );
        return <div> {foodRows} </div>;
    }

    render() {
        let collapsedColumn = {display: "none"};
        let expandedColumn = {};

        return(
            <div className="fridge__table noHighlight">
                <FoodActionsBar
                    actionStyle={this.foodActionStyles()}
                    isActive={(this.state.checkedFoods.size > 0).toString()}
                    checkedFoods={this.state.checkedFoods}
                    refreshAfterDelete={this.props.loadFoodsFunction}
                    deHighlightActions={this.deHighlightActions}
                />
                <div className="ftRow ftHeader">
                    <div className="ftCell checkmarkCell"> <FontAwesomeIcon className="icon" icon='check' size="lg"/> </div>
                    <div className="ftCell iconCell"> &nbsp; </div>
                    <div className="ftCell nameCell"> name </div>
                    <div className="ftCell expiryCell"> expiry </div>
                    <div className="ftCell collapseButtonCell"> <FontAwesomeIcon className="icon clickable" onClick={() => this.toggleCollapse()} icon={this.state.isCollapsed ? 'chevron-circle-left' : 'chevron-circle-right'} size="lg"/> </div>
                    <div className="ftCell quantityCell" style={this.state.isCollapsed ? collapsedColumn : expandedColumn}> quantity </div>
                    <div className="ftCell unitCell"  style={this.state.isCollapsed ? collapsedColumn : expandedColumn}> unit </div>
                    <div className="ftCell priceCell" style={this.state.isCollapsed ? collapsedColumn : expandedColumn}> price </div>
                </div>
                {this.generateFoodRows()}
            </div>
        );
    }
}

export class Fridge extends Component {
    constructor(props){
        super(props);
        this.state = {
            compartmentSelection: "fridge",
            foodData: [],
            infoRefreshed:false
        };
    }

    componentDidMount() {
        this.loadFoods();
    }

    loadFoods = () => {
        getFoods((foodData) => {this.setState({foodData, infoRefreshed: true})});
    }

    render() {
        console.log("Fridge", this.state.foodData);

        return (
            <div className="fridge__compartmentView">
                <FridgeButtonGroup
                    selection={this.state.compartmentSelection}
                    onClickButton={(newSelection) => this.setState({compartmentSelection: newSelection})}
                    // refreshAfterAdd={this.getFoods}
                />
                <FoodTable
                    foodData={this.state.foodData}
                    compartmentSelection={this.state.compartmentSelection}
                    loadFoodsFunction={this.getFoods}
                />
            </div>
        );
    }
}