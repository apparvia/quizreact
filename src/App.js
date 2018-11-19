import React, {Component} from 'react';
import logo from './quiz1.png';
import './App.css';
import {haesanonta} from "./components/ServiceClient";


class App extends Component {
    state = {
        data: [],
        aloita: false,
        eteenpain: 0,
        gameover: false,
        pisteet: 0,
        valinta: ""
    }
    componentDidMount = () => {
        haesanonta((kysymykset) => {
            this.setState({data: kysymykset});
        });
    }
    aloita = () => {
        this.setState({aloita: !this.state.aloita})
    }
    seuraava = () => {
        // Tässä viitataan eteenpäin: 0 lukuun jota kasvatetaan yhdellä kun annetaan ++ komento
        this.setState({eteenpain: this.state.eteenpain += 1 && this.state.eteenpain <= 3, valinta: ""})
        if (this.state.eteenpain === 4) {
            this.setState({
                gameover: true
            })
        }
    }
    // edellinen = () => {
    //     // Tässä viitataan taaksepäin:  lukuun jota kasvatetaan yhdellä kun annetaan ++ komento
    //     this.setState({taaksespain: this.state.eteenpain -= 1 && this.state.eteenpain >= 0})
    // }
    pisteyta = (e, numero) => {
        e.preventDefault();
        console.log("tässä käyttäjän numero" + " " + numero);
        console.log(this.state.valinta);
        if (this.state.valinta == numero) {
            this.setState({
                pisteet: this.state.pisteet + 1
            })
        }
    }
    vaihdavalinta = (e) => {
        e.preventDefault();
        this.setState({valinta: e.target.value})
    }


    render() {

        var kysymysrows = this.state.data.map(function (data, index) {
            return (
                <ul key={index} kysymystext={data.kysymys}>
                    <li><b>{data.id}.</b> "<i>{data.kysymys}</i>" <br/>{data.vaihtoehdot}</li>
                </ul>
            )
        });
        return (
            <div className="App">
                <header className="App-header">
                    {!this.state.aloita && <div>
                        <img src={logo} className="App-logo" alt="logo"/>
                        <p>
                            Default QUIZ
                        </p>
                        <button onClick={this.aloita}
                                className="App-link"
                                href=""
                                target="_blank"
                                rel="noopener noreferrer"
                        >
                            Click to Start

                        </button>
                    </div>}

                    {this.state.aloita && !this.state.gameover &&
                    <div>

                        {kysymysrows[this.state.eteenpain]}
                        <form onSubmit={(e) => {
                            //tässä kohtaa  (e. <tämä hakee taulukosta numeron VASTAUS-kentästä>)
                            this.pisteyta(e, this.state.data[this.state.eteenpain].vastaus)
                        }}>
                            <input value={this.state.valinta} onChange={this.vaihdavalinta}></input>
                            <button id="selaus1" onClick={this.seuraava}>Next</button>
                        </form>
                    </div>}
                    {this.state.gameover &&
                    <div>GAME OVER {this.state.pisteet}</div>

                    }
                </header>

            </div>
        );
    }
}

export default App;
