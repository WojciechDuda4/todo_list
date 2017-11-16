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
    }
  
    
  
    handleChange (event) {
      this.setState({value: event.target.value});
    }
  
    addItemToList() {
      const listMember = {value: this.state.value, isDone: false}
      const newListMembers = this.state.listMembers.slice();
      newListMembers.push(listMember);
      this.setState({value: '', listMembers: newListMembers});
      
    }

    handleCheckboxClick(index) {
      const newListMembers = this.state.listMembers.slice();
      newListMembers[index].isDone = !newListMembers[index].isDone;
      this.setState({
        listMembers: newListMembers,
      })    
    }
  
    render () {
      
        const listPositions = this.state.listMembers.map((listPosition, index) => {
            return (
                <List   key={index}
                        keyValue={index}
                        value={listPosition.value}
                        onClick={this.handleCheckboxClick.bind(this, index)}
                />
            )
        });
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