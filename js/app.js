import React, {Component} from "react";
import ReactDOM from "react-dom";
import generateRandomShips from "./ships"
import Title from "./title"
import Image from "./Image";


//* Component that builds a single table row of map
class MapRow extends Component {
    render() {
        const {columns, rowIndex} = this.props;
        return (
            <tr>
                {columns.map((el, y) =>
                    <MapItem key={y} x={rowIndex} y={y} field={el}/>)
                }
            </tr>
        );
    }
}

//* function that builds the whole map

class MapItem extends Component {
    handleClick = () => {
        const {x, y, eventClick} = this.props;
        if (typeof eventClick === "function") {
            eventClick(x, y);
        }
    };

    render() {
        return <td onClick={this.handleClick} className={this.props.item != 0 ? 'ship' : ''}></td>;
    }
}

//* Function that generates array that serves as a map and using generateRandomShips function modifies it
class Map extends Component {
    state = {
        p1: [],
        p2: []
    };

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
    };

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
        return (
            <table>
                <tbody>
                {this.state.p2.map((row, x) => <MapRow key={x} columns={row} rowIndex={x}/>)}
                </tbody>
            </table>
        )
    }
}


function App() {
    return (
        <>
            <Title/>
            <div id='divMap'>
                <Map/>
                <Map/>
            </div>
            <Image/>

        </>
    )
}

ReactDOM.render(<App/>, document.getElementById("app"));
