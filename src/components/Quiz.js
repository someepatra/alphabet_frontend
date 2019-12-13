import React, { Component } from "react";
class Quiz extends Component {
    constructor() {
        super();
        this.state = {
            cards: [],
            alphabets: [],
            displayCard: {},
            onealpha: {}
        }
    }
    async componentDidMount() {
        await this.setState({
            alphabets: this.props.alphabets,
            onealpha: this.props.alphabets[0],
            displayCard: this.props.alphabets[0].cards[0]
        })
        console.log(this.props.alphabets)


    }
    render() {
        return (
            <div className="mainDiv">
                <div className="leftSide">
                    <div className="quizAlpha">
                        {this.state.onealpha.alp_name}
                    </div>
                </div>

                <div className="rightSide">
                    <img src={this.state.displayCard.img} alt={this.state.displayCard.name} />

                </div>
            </div>

        )
    }
}
export default Quiz
