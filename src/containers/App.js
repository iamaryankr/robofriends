import React, { Component } from 'react';
import CardList from '../components/CardList';
import {robots} from '../robots';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundary from './ErrorBoundary';

//STATE? something that can change and effect our app

class App extends React.Component {
    constructor(){
        super()
        this.state = {
            robots: [], 
            searchfield: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users').then(response => {
            response.json();
        })
        .then(users => {
            this.setState({robots: robots})
        });
    }

    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value});
    }

    render(){
        const filteredRobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        })
        if(this.state.robots.length ===0){
            return <h1>Loading!</h1>
        }
        else{
            return (
                <div className="tc">
                    <h1 className="f1">Robofriends</h1>
                    <SearchBox searchChange = {this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundary>
                            {filteredRobots.length > 0 
                                ? <CardList robots={filteredRobots} />
                                : <h2 className='f1'>No Robots Found!</h2>
                            }
                        </ErrorBoundary>
                    </Scroll>
                    
                </div>
            );
        }
    }
}

export default App;