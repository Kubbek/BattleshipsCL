import React, {Component} from "react";
import ReactDOM from "react-dom";
import generateRandomShips from "./ships"
import Title from "./title"
import Image from "./Image";


//* Function that generates array that serves as a map and using generateRandomShips function modifies it
class Map extends Component {
    state = {
        p1: [],
        p2: [],
        hits: [],
        pHits: 0,
        eHits: 0
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
                p2: this.genStartupArray(),
                hits: this.genStartupArray()
            }
            , () => {
                let newP1Map = [...this.state.p1];
                let newP2Map = [...this.state.p2];
                generateRandomShips(newP1Map);
                generateRandomShips(newP2Map);
                this.setState({
                    p1: newP2Map,
                    p2: newP2Map
                })
            });

    }

    enemyShot = () => {
        let shotX = Math.floor((Math.random() * 14) + 1);
        let shotY = Math.floor((Math.random() * 14) + 1);
        let hitsP1 = [...this.state.p1];
        if (this.state.p1[shotX][shotY] === 0) {
            hitsP1[shotX][shotY] = 'miss';
            this.setState({
                p1: hitsP1
            })
        } else {
            hitsP1[shotX][shotY] = 'hit';
            this.setState({
                p1: hitsP1,
                eHits: this.state.eHits + 1
            });
            if (this.state.eHits === 14) {
                alert('Enemy Wins')
            }
        }
    };


    checkForHit = (x, y) => {
        let hitsTemp = [...this.state.hits];
        if (this.state.p2[x][y] === 0) {
            hitsTemp[x][y] = 'miss';
            this.setState({
                hits: hitsTemp
            })
        } else {
            hitsTemp[x][y] = 'hit';
            this.setState({
                hits: hitsTemp,
                pHits: this.state.pHits + 1
            });
            if (this.state.pHits === 14) {
                alert('You win!')
            }
        }
    };

    render() {
        return (
            <>
                <table>
                    <tbody>
                    {this.state.p1.map((row, x) => <MapRow key={x} columns={row} rowIndex={x}/>)}
                    </tbody>
                    <tbody>
                    {this.state.hits.map((row, x) => <MapRow key={x} columns={row} rowIndex={x} eventShoot={this.checkForHit} eventEnemyShoots={this.enemyShot}/>)}
                    </tbody>
                </table>
                <div className='divCounter' >
                    <CounterEnemy counterE={this.state.eHits}/>
                    <CounterPlayer counterP={this.state.pHits}/>
                </div>
            </>
        )
    }
}

//* Component that builds a single table row of map
class MapRow extends Component {
    render() {
        const {columns, rowIndex, eventShoot, eventEnemyShoots} = this.props;
        return (
            <tr>
                {columns.map((el, y) =>
                    <MapItem key={y} x={rowIndex} y={y} field={el} eventShoot={eventShoot}
                             eventEnemyShoots={eventEnemyShoots}/>)
                }
            </tr>
        );
    }
}

//* function that builds the whole map

class MapItem extends Component {

    handleClick = () => {
        const {x, y, eventShoot, eventEnemyShoots} = this.props;
        if (typeof eventShoot === "function") {
            eventShoot(x, y);
            setTimeout(eventEnemyShoots, 500)
        }
    };

    render() {
        let className;
        switch (this.props.field) {
            case 0:
                className = 'see';
                break;
            case 'border':
                className = 'border';
                break;
            case 'hit':
                className = 'hit';
                break;
            case 'miss':
                className = 'miss';
                break;
            case 'ship1':
            case 'ship2':
            case 'ship3':
            case 'ship4':
                className = 'ship';
                break
        }
        if(this.props.field==='border'){
            return <td  className={className}/>;
        }

        return <td onClick={this.handleClick} className={className}/>;
    }
}

class CounterPlayer extends Component {
    render() {
        const {counterP} = this.props;
        return (
            <p className='counter pE'>ENEMY SHIPS LEFT:{(15 - counterP) }</p>
        );
    }
}

class CounterEnemy extends Component{
    render() {
        const {counterE} = this.props
        return(
            <p className='counter pC'> YOUR SHIPS LEFT:{15 - counterE}</p>
        );
    }

}

function App() {
    return (
        <>
            <Title/>
            <div id='divMap'>
                <Map/>
            </div>
            <Image/>
        </>
    )
}

ReactDOM.render(<App/>, document.getElementById("app"));
