import React, {Component} from 'react';

class List extends Component {
    
      render() {
        return (
          <div key = {this.props.keyValue}>
          <input    type="checkbox" 
                    onClick={this.props.onClick} />
          <label>{this.props.value}</label>
          </div>
        )
      }
    }

export default List;