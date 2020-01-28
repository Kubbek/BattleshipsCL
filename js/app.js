import React, {Component} from "react";
import ReactDOM from "react-dom";
import generateRandomShips from "./ships"

class Map extends Component {
    state = {
        p1: [],
        p2: []
    }

    genStartupArray = () => {
        return [
            ['border', 'border', 'border', 'border', 'border', 'border', 'border', 'border', 'border', 'border', 'border', 'border', 'border', 'border', 'border', 'border'],
            ['border', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'border'],
            ['border', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'border'],
            ['border', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'border'],
            ['border', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'border'],
            ['border', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'border'],
            ['border', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'border'],
            ['border', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'border'],
            ['border', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'border'],
            ['border', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'border'],
            ['border', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'border'],
            ['border', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'border'],
            ['border', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'border'],
            ['border', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'border'],
            ['border', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'border'],
            ['border', 'border', 'border', 'border', 'border', 'border', 'border', 'border', 'border', 'border', 'border', 'border', 'border', 'border', 'border', 'border'],]
    }

    componentDidMount() {

        this.setState({
                p1: this.genStartupArray(),
                p2: this.genStartupArray()
            }
            , () => {
                let newP2Map = [...this.state.p2];
                generateRandomShips(newP2Map);
                this.setState({
                    p2: newP2Map
                })
            });

    }

    render() {
        return <h1>Map</h1>
    }
}


function App() {
    return <Map/>
}

ReactDOM.render(<App/>, document.getElementById("app"));
