import React, { Component } from 'react';
import "./metronome.css";
import click1 from "./click1.mp3";
import click2 from "./click2.mp3";
import Stopwatch from "./stopwatch";

class Metronome extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             bpm: 80,
             count: 0,
             beatsPerMeasure: 4,
             playing: false
        }

        this.click1 = new Audio(click1);
        this.click2 = new Audio(click2);
        this.stopwatch = React.createRef();
    }

    playClick = () => {
        const count = this.state.count;
        const beatsPerMeasure = this.state.beatsPerMeasure;

        if (count % beatsPerMeasure === 0) {
            this.click1.play();
        }
        else {
            this.click2.play();
        }

        this.setState(state => ({
            count: (state.count + 1) % beatsPerMeasure
        }));
    };

    increaseBpmByOne = () => {
        if (this.state.bpm < 240) {
            this.setState(state => ({
                count: 0,
                bpm: (state.bpm + 1)
            }));
        }
    }

    decreaseBpmByOne = () => {
        if (this.state.bpm > 60) {
            this.setState(state => ({
                count: 0,
                bpm: (state.bpm - 1)
            }));
        }
    }

    increaseMeasureByOne = () => {
        if (this.state.beatsPerMeasure < 10) {
            this.setState(state => ({
                count: 0,
                beatsPerMeasure: (state.beatsPerMeasure + 1)
            }))
        }
    }

    decreaseMeasureByOne = () => {
        if (this.state.beatsPerMeasure > 1) {
            this.setState(state => ({
                count: 0,
                beatsPerMeasure: (state.beatsPerMeasure - 1)
            }))
        }
    }

    slideChangingBpm = event => {
        const bpm = parseInt(event.target.value);
        
        if (this.state.playing) {
            clearInterval(this.timer);
            this.timer = setInterval(this.playClick, (60000/bpm));

            this.setState({
                count: 0,
                bpm: bpm
            })
        }
        else {
            this.setState({
                bpm: bpm
            })
        }
    }

    startStop = () => {
        if (this.state.playing) {
            //Stop the metronome
            clearInterval(this.timer);
            this.stopwatch.current.stopTimer();
            this.setState({
                playing:false
            });
        }
        else {
            //Start the metronome
            this.timer = setInterval(this.playClick, (60000/this.state.bpm));
            this.stopwatch.current.resetTimer();
            this.stopwatch.current.startTimer();
            this.setState({
                count: 0,
                playing: true
                },
                this.playClick
            );
        }
    }
    
    render() {
        return (
            <div className="container">
                <div className="metronome">
                    <div className="bpm-display">
                        <span className="tempo">{this.state.bpm}</span>
                        <span className="bpm">bpm</span>
                    </div>
                    <div className="tempo-settings">
                        <button onClick={this.decreaseBpmByOne} className="decrease-tempo">-</button>
                        <input type="range" min="60" max="240" value={this.state.bpm} onChange={this.slideChangingBpm} />
                        <button onClick={this.increaseBpmByOne} className="increase-tempo">+</button>
                    </div>
                    <button onClick={this.startStop}>{this.state.playing ? "Stop" : "Start"}</button>
                    <div className="measure-settings">
                        <button onClick={this.decreaseMeasureByOne} className="decrease-measure">-</button>
                        <span className="measure-display">{this.state.beatsPerMeasure}</span>
                        <button onClick={this.increaseMeasureByOne} className="increase-measure">+</button>
                    </div>
                    <Stopwatch ref={this.stopwatch}/>
                </div>
            </div>
        )
    }
}

export default Metronome;
