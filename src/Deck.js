import React, { Component } from 'react';
import Card from './Card';
import './Deck.css';
import axios from 'axios';
const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

class Deck extends Component {
    constructor(props) {
        super(props);
        this.state = { deck: null, drawn: []}
    };

    async componentDidMount() {
        const response = await axios.get(`${API_BASE_URL}/new/shuffle/`);
        this.setState({ deck: response.data });
    }

    handleClick = async () => {
        let deck_id = this.state.deck.deck_id;

        try {
            const url = `${API_BASE_URL}/${deck_id}/draw/`;
            const response = await axios.get(url);
            if(!response.data.success) {
                throw new Error('No card remaining!');
            } 

            const cards = response.data.cards[0];
            this.setState(st => ({
                drawn: [

                    ...st.drawn,
                    {
                        id: cards.code,
                        image: cards.image,
                        name: `${cards.value} of ${cards.suit}`
                    }
                ]
            }));

        } catch (e) {
            alert(e);
        }
        
     
    }

    render() {
        const cards = this.state.drawn.map( c => (
            <Card key={c.id} name={c.name} image={c.image}/>
        ));
        return(
            <div className="Deck">
                <h1 className="Deck-title">⟡CARD DEALER⟡</h1>
                <h2 className="Deck-title subtitle">⟡A LITTLE DEMO MADE WITH REACT⟡</h2>
                <button className="Deck-btn" onClick={this.handleClick}>DEAL ME A CARD</button>
                <div className='Deck-cardarea'>{cards}</div>
            </div>
        )
    }
}


export default Deck;
