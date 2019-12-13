import React, { Component } from "react";
import Cards from './Cards'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

class Alphabets extends Component {
    constructor() {
        super();
        this.state = {
            cards: [],
            alphabets: [],
            selectedCard: {}
        }
        this.setCard = this.setCard.bind(this);
    }
    async componentDidMount() {
        await this.setState({
            alphabets: this.props.alphabets
        });

        console.log(this.props.alphabets);
        this.setState({
            selectedCard: this.props.alphabets[0].cards[0]
        })
    }

    setCard(alphabet_index) {
        this.setState({
            selectedCard: this.props.alphabets[alphabet_index].cards[0]
        })
    }

    render() {
        return (
            <div className="mainDiv">
                <div className="leftSide">
                    {this.state.alphabets.map((alphabet, index) => {
                        return (
                            <div className="eachAlpha" id="card1">
                                <div key={alphabet.id}>
                                    <h3 onClick={() => {
                                        this.setCard(index)
                                    }} className="alphaStyle"> {alphabet.alp_name} </h3>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="rightSide">
                    <div className="card">
                        <Cards card={this.state.selectedCard} />
                    </div>
                    <h1>Do u want to play a game</h1>
                    {/* <button >yes</button> */}
                    <Link to="/quiz"><button>Yes</button></Link>
                </div>
            </div>
        )
    }
}
export default Alphabets