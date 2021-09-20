import React, { Component } from 'react';
import { Fridge } from './Fridge';

export class MainView extends Component {
  renderView() {
    const view = this.props.viewType;
    if (view === 'fridge') {
      return (<Fridge />);
    } if (view === 'shop') {
      return <div className="placeholder"> Füd's Shöp section is coming soon! </div>;
    } if (view === 'recipe') {
      return <div className="placeholder"> Füd's Rëcipe section is coming soon! </div>;
    }
  }

  render() {
    return (this.renderView());
  }
}
