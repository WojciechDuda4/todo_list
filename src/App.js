import React, { Component } from 'react';
import './App.css';
import Title from "./Components/Title";
import SearchComponent from "./Components/SearchComponent";

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <Title/>
        </div>
        <div>
          <SearchComponent />
        </div>
      </div>
    );
  }
}

export default App;
