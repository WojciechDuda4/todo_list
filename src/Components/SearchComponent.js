

import React, {Component} from 'react';

class SearchComponent extends Component {
    render () {
      return (
        <div>
        <div className="textboxPanel">
          <input type="text" className="textbox" value={this.props.value} onChange={this.props.onChange}/>
          <button type="button" className="button" id="tbAdd" onClick={this.props.onClick}>Add</button>
          </div>
        </div>
      )
    }
  }

export default SearchComponent;