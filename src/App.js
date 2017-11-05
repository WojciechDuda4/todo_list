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
      value: '',
      listMembers: [],
      recordId: 0
    };

    this.handleChange = this.handleChange.bind(this);
  }

  

  handleChange (event) {
    this.setState({value: event.target.value});
  }

  addItemToList() {
    const isDoneDefaultValue = 0;
    this.state.listMembers.push([this.state.recordId, this.state.value, isDoneDefaultValue]);
    console.log(this.state.listMembers);
    this.setState({recordId: this.state.recordId + 1});
  }

  render () {
    return (
      
      <div className="textboxPanel">
        <input type="text" className="textbox" value={this.state.value} onChange={this.handleChange}/>
        <button type="button" className="button" id="tbAdd" onClick={() => this.addItemToList()}>Add</button>
          <List 
            members = {this.state.listMembers.map((member) =>
              member
            )}
          />
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

class List extends Component {

  returnListPosition() {
    console.log(this.props.members);
    let listItems = this.props.members.map((listItem) =>
      <li key={listItem[0]} >{listItem[1]}</li>
  )
    console.log(this.props.members);
    return (
        <ul>{listItems}</ul>
    )
  }
    
  

  render() {
    return (
      <div>
      {this.returnListPosition()}
      </div>
    )
  }
}

export default App;
