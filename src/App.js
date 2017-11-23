import React, { Component } from 'react';
import './App.css';
import Title from "./Components/Title";
import SearchComponent from "./Components/SearchComponent";
import List from "./Components/List";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      listMembers: [],
      doneListMembers: []
    };
  }

  handleCheckboxClick(index) {
    const newListMembers = this.state.listMembers.slice();
    const newDoneListMembers = this.state.doneListMembers.slice();
    const newDoneListMember = this.state.listMembers[index];
    newDoneListMember.isDone = !newDoneListMember.isDone;
    newListMembers.splice(index, 1);
    newDoneListMembers.push(newDoneListMember);
    this.setState({
      listMembers: newListMembers,
      doneListMembers: newDoneListMembers
    }) 
     
  }

  handleDoneCheckboxClick(index) {
    const newListMembers = this.state.listMembers.slice();
    const newDoneListMembers = this.state.doneListMembers.slice();
    const newListMember = this.state.doneListMembers[index];
    newListMember.isDone = !newListMember.isDone;
    newListMembers.push(newListMember);
    newDoneListMembers.splice(index, 1);
    this.setState({
      listMembers: newListMembers,
      doneListMembers: newDoneListMembers
    }) 
  }

  handleChange (event) {
    this.setState({value: event.target.value});
  }

  addItemToList() {
    const listMember = {value: this.state.value, isDone: false}
    const newListMembers = this.state.listMembers.slice();
    newListMembers.push(listMember);
    this.setState({value: '', listMembers: newListMembers}, () => console.log(this.state.listMembers));
    
  }

  render() {
    const listPositions = this.state.listMembers.map((listPosition, index) => {
      return (
          <List   key={index}
                  keyValue={index}
                  checked={listPosition.isDone}
                  value={listPosition.value}
                  onClick={this.handleCheckboxClick.bind(this, index)}
          />
      )
  });
    const doneListPositions = this.state.doneListMembers.map((doneListPosition, index) => {
      return (
        <List   key={index}
        keyValue={index}
        checked={doneListPosition.isDone}
        value={doneListPosition.value}
        onClick={this.handleDoneCheckboxClick.bind(this, index)}
          />
      )
    }
  )
    return (
      <div>
        <div>
          <Title/>
        </div>
        <div>
          <SearchComponent value={this.state.value}
                           onClick={this.addItemToList.bind(this)}
                           onChange={this.handleChange.bind(this)}
          />
        </div>
        <section style={{width: 600}}>
        <div>
          <h4>Do zrobienia:</h4>
              {listPositions}
        </div>
        </section>
        <section >
        <div>
          <h4>Wykonane:</h4>
              {doneListPositions}
        </div>
        </section>
      </div>
    );
  }
}

export default App;
