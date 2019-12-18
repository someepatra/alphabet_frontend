import React, { Component } from "react";

class Cards extends Component {
    render() {
        return (
            <div key={this.props.card.id} className="imageDiv">
                <img className="imgSrc" src={this.props.card.img} alt={this.props.card.name} />
                <h3 className="imageText"> {this.props.card.card_name} </h3>

            </div>
        )
    }
}

export default Cards