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
                            <div className="eachAlpha" id="card1" onClick={() => {
                                this.setCard(index)
                            }}>
                                <div key={alphabet.id} className="alphaStyleDirectParent">
                                    <h3 className="alphaStyle quizAlpha"> {alphabet.alp_name} </h3>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="rightSide">
                    <div className="card">
                        <Cards card={this.state.selectedCard} />
                    </div>
                    <h1 >Want to play a game</h1>
                    <Link to="/quiz"><button className="btn btn-primary btn-lg buttonYes">Yes</button></Link>
                </div>
            </div>
        )
    }
}
export default Alphabets