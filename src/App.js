import React, { Component } from 'react';
import './App.css';
import Title from "./Components/Title";
import SearchComponent from "./Components/SearchComponent";
import List from "./Components/List";

/* TODO
- Dodanie daty do pozycji i kategoryzowanie ich po tym (do 7 dni w przód)
- Dodać zbiór etykiet dla zadań
- Pobawić się css w celu upiększenia strony
*/

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
    let newListMembers = this.state.listMembers.slice();
    let newDoneListMembers = this.state.doneListMembers.slice();
    const newDoneListMember = this.state.listMembers[index];
    newDoneListMember.isDone = !newDoneListMember.isDone;
    newDoneListMember.realizationDate = this.getActualDate();
    newListMembers.splice(index, 1);
    newDoneListMembers.push(newDoneListMember);
    newListMembers = this.sortByDate(newListMembers);
    newDoneListMembers = this.sortByDate(newDoneListMembers);
    this.setState({
      listMembers: newListMembers,
      doneListMembers: newDoneListMembers
    }, () => console.log(this.state.doneListMembers)) 
     
  }

  handleDoneCheckboxClick(index) {
    let newListMembers = this.state.listMembers.slice();
    let newDoneListMembers = this.state.doneListMembers.slice();
    const newListMember = this.state.doneListMembers[index];
    newListMember.isDone = !newListMember.isDone;
    newListMember.realizationDate = '';
    newListMembers.push(newListMember);
    newDoneListMembers.splice(index, 1);
    newListMembers = this.sortByDate(newListMembers);
    newDoneListMembers = this.sortByDate(newDoneListMembers);
    this.setState({
      listMembers: newListMembers,
      doneListMembers: newDoneListMembers
    }, () => console.log(this.state.doneListMembers)) 
  }

  handleChange (event) {
    this.setState({value: event.target.value});
  }

  addItemToList() {
    const actualDate = this.getActualDate();
    const listMember = {value: this.state.value, isDone: false, plannedDate: actualDate, realizationDate: ''};
    console.log(listMember);
    let newListMembers = this.state.listMembers.slice();
    newListMembers.push(listMember);

    newListMembers = this.sortByDate(newListMembers);
    this.setState({value: '', listMembers: newListMembers}, () => console.log(this.state.listMembers));
    
  }

  sortByDate(list) {
    if (list.realizationDate)
    {
      list.sort(function(a, b){return Date.parse(a.realizationDate - b.realizationDate)});
    }
    else
    {
      list.sort(function(a, b){return Date.parse(a.plannedDate) - Date.parse(b.plannedDate)});
    }
    
    return list;
  }

  getActualDate() {
    let date = new Date();
    let year = date.getFullYear().toString();
    let month = date.getMonth().toString();
    let day = date.getDate().toString();
    let hour = date.getHours().toString();
    let minutes = date.getMinutes().toString();
    let seconds = date.getSeconds().toString();
    let dash = '-';
    let colon = ':';
    if (month.length === 1)
    {
      month = '0' + month;
    }
    if (day.length === 1)
    {
      day = '0' + day;
    }
    if (hour.length === 1)
    {
      hour = '0' + hour;
    }
    if (minutes.length === 1)
    {
      minutes = '0' + minutes;
    }
    if (seconds.length === 1)
    {
      seconds = '0' + seconds;
    }
    let actualDate = year + dash + month + dash + day + ' ' + hour + colon + minutes + colon + seconds;
    return actualDate;
  }

  render() {
    const listPositions = this.state.listMembers.map((listPosition, index) => {
      return (
          <List   key={index}
                  keyValue={index}
                  text={" - Planowana data wykonania: "}
                  checked={listPosition.isDone}
                  value={listPosition.value}
                  Date={listPosition.plannedDate}
                  onChange={this.handleCheckboxClick.bind(this, index)}
          />
      )
  });
    const doneListPositions = this.state.doneListMembers.map((doneListPosition, index) => {
      return (
        <List   key={index}
        keyValue={index}
        text = {" - Data wykonania: "}
        checked={doneListPosition.isDone}
        value={doneListPosition.value}
        Date={doneListPosition.realizationDate}
        onChange={this.handleDoneCheckboxClick.bind(this, index)}
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
