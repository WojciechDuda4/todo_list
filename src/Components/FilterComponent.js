import React, {Component} from 'react';

class FilterComponent extends Component {
    render() {
        return (
            <div className="textboxPanel">
                <label>Filtruj</label>
                <input type="text" className="textBox" value={this.props.value} onChange={this.props.onChange}/>
            </div>
        )
    }
}

export default FilterComponent;
