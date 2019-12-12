import React, { Component } from "react";
class Cards extends Component {
    render() {
        return (
            <div key={this.props.card.id}>
                <img src={this.props.card.img} alt={this.props.card.name} />
                <h3> {this.props.card.card_name} </h3>

            </div>
        )
    }
}

export default Cards