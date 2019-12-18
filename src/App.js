import React, { Component } from "react";
import './App.css';
import './mediaQuery.css'
import axios from "axios";
import Alphabets from './components/Alphabets.js'
import { BrowserRouter as Router, Route } from "react-router-dom"
import Quiz from "./components/Quiz";

const base_url = "https://alphabets-game.herokuapp.com" || 3001


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
      const request = await axios.get(`${base_url}/alphabets`);
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
        <Route path="/quiz" render={() => <Quiz base_url={base_url} alphabets={alphabets} />} />
      </Router>
    );
  }
}

export default App;

