import React, { Component } from 'react';
import './App.css';
import Title from "./Components/Title";
import SearchComponent from "./Components/SearchComponent";
import List from "./Components/List";
import FilterComponent from "./Components/FilterComponent";

/* TODO
- Dodać zbiór etykiet dla zadań
- Pobawić się css w celu upiększenia strony
*/

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      filterValue: '',
      listMembers: [],
      doneListMembers: [],
      filteredListMembers: [],
      filteredDoneListMembers: [],
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
      doneListMembers: newDoneListMembers,
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

  handleFilterChange(event) {
    this.setState({filterValue: event.target.value}, () => this.filterValues());
  }

  addItemToList() {
    const actualDate = this.getActualDate();
    const listMember = {value: this.state.value, isDone: false, plannedDate: actualDate, realizationDate: ''};
    console.log(listMember);
    let newListMembers = this.state.listMembers.slice();
    newListMembers.push(listMember);

    newListMembers = this.sortByDate(newListMembers);
    this.setState({value: '', listMembers: newListMembers
      },  () => console.log(this.state.listMembers));
    
  }

  filterValues() {
    let newListMembers = [];
    let newDoneListMembers = [];
    let pattern = ".*" + this.state.filterValue + ".*";
    let regex = new RegExp(pattern)
    this.state.listMembers.forEach((item) => {
      if (item.value.match(regex)) {
        newListMembers.push(item);
        console.log(newListMembers);
      }
  })
    this.state.doneListMembers.forEach((item) => {
      if (item.value.match(regex)) {
      newDoneListMembers.push(item);
      console.log(newDoneListMembers);
      }
  })
    this.setState({filteredListMembers: newListMembers,
                  filteredDoneListMembers: newDoneListMembers
                });
  }

  sortByDate(list) {
    if (list.realizationDate)
    {
      list.sort(function(a, b){return Date.parse(a.realizationDate) - Date.parse(b.realizationDate)});
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
    let listPositions, doneListPositions;
    if (!this.state.filterValue)
    {
    listPositions = this.state.listMembers.map((listPosition, index) => {
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
    doneListPositions = this.state.doneListMembers.map((doneListPosition, index) => {
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
}
  else {
    listPositions = this.state.filteredListMembers.map((filteredListPosition, index) => {
      return (
          <List   key={index}
                  keyValue={index}
                  text={" - Planowana data wykonania: "}
                  checked={filteredListPosition.isDone}
                  value={filteredListPosition.value}
                  Date={filteredListPosition.plannedDate}
                  onChange={this.handleCheckboxClick.bind(this, index)}
          />
      )
  });
    doneListPositions = this.state.filteredDoneListMembers.map((filteredDoneListPosition, index) => {
      return (
        <List   key={index}
        keyValue={index}
        text = {" - Data wykonania: "}
        checked={filteredDoneListPosition.isDone}
        value={filteredDoneListPosition.value}
        Date={filteredDoneListPosition.realizationDate}
        onChange={this.handleDoneCheckboxClick.bind(this, index)}
          />
      )
    }
  )
  }
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
        <div>
          <FilterComponent value={this.state.filterValue}
                            onChange={this.handleFilterChange.bind(this)}
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
