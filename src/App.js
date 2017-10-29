import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <Title/>
    );
  }
}

class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (event) {
    this.setState({value: event.target.value});
  }

  addItemToList() {
    console.log("new item added! </br>" + this.state.value);
  }

  render () {
    return (
      
      <div className="textboxPanel">
        <input type="text" className="textbox" value={this.state.value} onChange={this.handleChange}/>
        <button type="button" className="button" id="tbAdd" onClick={() => this.addItemToList()}>Add</button>
        </div>
    )
  }
  
}

class Title extends Component {
  render () {
    return(
      <div>
    <h3>TODO List</h3>
    <SearchComponent/>
    </div>
    )
  }
}

export default App;
