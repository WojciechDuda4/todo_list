import React, { Component } from 'react';
import './App.css';
import Title from "./Components/Title";
import SearchComponent from "./Components/SearchComponent";
import List from "./Components/List";
import FilterComponent from "./Components/FilterComponent";

/* TODO
- Zamienić ręczne tworzenie daty na bibliotekę moment.js
- Dodać zbiór etykiet dla zadań
- Pobawić się css w celu upiększenia strony
- Usuwanie pozycji
*/

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      filterValue: '',
       listMembers: []
    };
  }

  handleCheckboxClick(index) {
    let newListMembers = this.state.listMembers.slice();
    if (!newListMembers[index].isDone)
    {
      newListMembers[index].realizationDate = getCurrentDate();
    }
    else
    {
      newListMembers[index].realizationDate = '';
    }
    newListMembers[index].isDone = !newListMembers[index].isDone;
    
    this.setState({
      listMembers: newListMembers
    }) 
     
  }

  handleChange (event) {
    this.setState({value: event.target.value});
  }

  handleFilterChange(event) {
    this.setState({filterValue: event.target.value});
  }

  addItemToList() {
    const actualDate = getCurrentDate();
    const listMember = {value: this.state.value, isDone: false, plannedDate: actualDate, realizationDate: ''};
    let newListMembers = this.state.listMembers.slice();
    newListMembers.push(listMember);
    this.setState({value: '', listMembers: newListMembers});
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

  CheckValueUsingRegex(value) {
    let pattern = ".*" + this.state.filterValue + ".*";
    let regex = new RegExp(pattern, "i");
    if (!value.match(regex))
      return false;
    else
      return true;
  }

  render() {

    const listPositions = this.state.listMembers.map((listPosition, index) => {
      if (!listPosition.isDone && this.CheckValueUsingRegex(listPosition.value))
      {
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
      }
    })

    const doneListPositions = this.state.listMembers.map((doneListPosition, index) => {
      if (doneListPosition.isDone && this.CheckValueUsingRegex(doneListPosition.value))
      {
        return (
          <List   key={index}
                  keyValue={index}
                  text={" - Data wykonania: "}
                  checked={doneListPosition.isDone}
                  value={doneListPosition.value}
                  Date={doneListPosition.realizationDate}
                  onChange={this.handleCheckboxClick.bind(this, index)}
          />
        )
      }
    })

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
              {this.sortByDate(listPositions)}
        </div>
        </section>
        <section >
        <div>
          <h4>Wykonane:</h4>
              {this.sortByDate(doneListPositions)}
        </div>
        </section>
      </div>
    );
  }
}

function getCurrentDate() {
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

export default App;
