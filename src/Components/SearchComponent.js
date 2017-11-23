/* TODO
- Dodanie daty do pozycji i kategoryzowanie ich po tym (do 7 dni w przód)
- Zrobione pozycje przenosić do sekcji zrobione
- Dodać zbiór etykiet dla zadań
- Pobawić się css w celu upiększenia strony
*/

import React, {Component} from 'react';
import List from "./List";

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