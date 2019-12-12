import React, { Component } from "react";
import './App.css';
import axios from "axios";
import Alphabets from './components/Alphabets.js'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Quiz from "./components/Quiz";

class App extends Component {
  constructor() {
    super();
    this.state = {
      alphabets: [],
      apiIsLoaded: false
    };
    this.callAPI = this.callAPI.bind(this);
  }
  componentDidMount() {
    this.callAPI();
  }
  async callAPI() {
    try {
      const request = await axios.get("/alphabets");
      console.log("show", request);
      const alphabetData = request.data;
      this.setState({
        alphabets: alphabetData,
        apiIsLoaded: true
      });
    } catch (err) {
      console.log("show error: ", err);
    }
  }
  render() {
    const { alphabets, apiIsLoaded } = this.state;
    const renderAlphabet = apiIsLoaded ? (
      <Alphabets alphabets={alphabets} />
    ) : (
        <h1>loading....</h1>
      );
    return (
      <Router>
        <Route path="/" exact render={() => (<div>{renderAlphabet}</div>)} />
        <Route path="/quiz" component={Quiz} />
      </Router>
    );
  }
}

export default App;

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
