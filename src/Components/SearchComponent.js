import React, {Component} from 'react';
import List from "./List";

class SearchComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        value: '',
        listMembers: []
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
    }
  
    
  
    handleChange (event) {
      this.setState({value: event.target.value});
    }
  
    addItemToList() {
      const isDoneDefaultValue = false;
      this.state.listMembers.push([this.state.value, isDoneDefaultValue]);
      this.setState({value: ''});
      console.log(this.state.listMembers);
    }

    handleCheckboxClick(event) {
      console.log(event.target);
      console.log(event.target.value)
    }
  
    render () {
        const listPositions = this.state.listMembers.map((listPosition, iterator) => {
            return (
                <List   key={iterator}
                        keyValue={iterator}
                        value={listPosition[0]}
                        onClick={this.handleCheckboxClick}
                />
            )
        });
        console.log(listPositions);
      return (
        <div>
        <div className="textboxPanel">
          <input type="text" className="textbox" value={this.state.value} onChange={this.handleChange}/>
          <button type="button" className="button" id="tbAdd" onClick={() => this.addItemToList()}>Add</button>
          </div>
          <div>
              {listPositions}
        </div>
        </div>
      )
    }
    
  }

export default SearchComponent;