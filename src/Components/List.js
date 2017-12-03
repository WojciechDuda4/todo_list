import React, {Component} from 'react';

class List extends Component {
    
      render() {
        return (
          <div key = {this.props.keyValue}>
          <input    type="checkbox" 
                    onChange={this.props.onChange}
                    checked={this.props.checked} />
          <label>{this.props.value} {this.props.text} {this.props.Date}</label>
          </div>
        )
      }
    }

export default List;