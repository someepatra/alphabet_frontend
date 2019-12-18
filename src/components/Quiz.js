import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import axios from "axios"

class Quiz extends Component {
    constructor() {
        super();
        this.state = {
            cards: [],
            alphabets: [],
            index: 0,
            displayCard: {},
            onealpha: {},
            toHomePage: false,
            random1: {},
            random2: {},
            score: 0
        }
        this.nextQuiz = this.nextQuiz.bind(this)
        this.callAPI = this.callAPI.bind(this)
        this.renderRedirect = this.renderRedirect.bind(this)
        this.shuffleImages = this.shuffleImages.bind(this)
        this.shuffle = this.shuffle.bind(this)
        this.random = this.random.bind(this)
        this.goBack = this.goBack.bind(this)
    }

    async callAPI() {
        try {
            const request = await axios.get(`${this.props.base_url}/alphabets`);
            console.log("show", request);
            const alphabetData = request.data;
            this.setState({
                alphabets: alphabetData,
            });
        } catch (err) {
            console.log("show error: ", err);
        }
    }
    random() {
        let randomIndex1 = 0;
        let randomIndex2 = 0;


        do {
            randomIndex1 = Math.floor(Math.random() *
                this.state.alphabets.length);
            randomIndex2 = Math.floor(Math.random() *
                this.state.alphabets.length);
        } while (randomIndex1 === randomIndex2 || randomIndex1 === this.state.index || randomIndex2 === this.state.index)
        this.setState({
            random1: this.state.alphabets[randomIndex1].cards[0],
            random2: this.state.alphabets[randomIndex2].cards[0]
        })
    }
    async componentDidMount() {
        await this.callAPI();
        let cardList = this.state.alphabets.map(alphabet => {
            return alphabet.cards[0]
        })

        this.setState({
            cards: cardList
        })

        this.setState({
            onealpha: this.state.alphabets[this.state.index],
            displayCard: this.state.cards[this.state.index]
        })
        this.random();
    }

    async nextQuiz() {
        if (this.state.index < 25) {
            await this.setState({
                index: this.state.index + 1
            })
            this.random();
            let newScore = this.state.score + 1;
            this.setState({
                onealpha: this.state.alphabets[this.state.index],
                displayCard: this.state.cards[this.state.index],
                score: newScore
            })
        } else {
            this.setState({
                toHomePage: true
            })
        }
    }

    goBack() {
        this.setState({
            toHomePage: true
        })
    }

    renderRedirect = () => {
        if (this.state.toHomePage) {
            return <Redirect to='/' />
        }
    }

    shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    shuffleImages = () => {

        let images = [
            (<img className="imgSrc" onClick={() => this.nextQuiz()} src={this.state.displayCard.img} alt={this.state.displayCard.name} />),
            (<img className="imgSrc" src={this.state.random1.img} alt={this.state.displayCard.name} />),
            (<img className="imgSrc" src={this.state.random2.img} alt={this.state.displayCard.name} />)
        ]

        this.shuffle(images);

        return (
            <>
                <div className="card imageDiv">
                    {images[0]}
                </div>
                <div className="card imageDiv">
                    {images[1]}
                </div>
                <div className="card imageDiv">
                    {images[2]}
                </div>
            </>
        )
    }

    render() {
        return (
            <>

                <div className="mainDiv">
                    {this.renderRedirect()}
                    <div className="quizLeft">
                        <div className="secondPageQuizAlpha quizLeftLetter">
                            <h1>{this.state.onealpha.alp_name}</h1>

                        </div>
                    </div>
                    <div className="quizRight">

                        {this.shuffleImages()}
                    </div>

                    <div>
                        <button className="checkBox" onClick={() => this.goBack()}> X </button>
                        <p className="score">Score: {this.state.score}</p>
                    </div>
                </div>
            </>
        )
    }
}
export default Quiz
