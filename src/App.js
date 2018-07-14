import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
//import { Route, Link } from 'react-router-dom';
import './App.css';
import * as firebase from 'firebase';
import RoomList  from './Components/RoomList';
import MessageList from './Components/MessageList';


  var config = {
    apiKey: "AIzaSyAqQJCZ4DyQtAO8TQTtj8mBWgBTpwrlijk",
    authDomain: "bloc-chat-685f3.firebaseapp.com",
    databaseURL: "https://bloc-chat-685f3.firebaseio.com",
    projectId: "bloc-chat-685f3",
    storageBucket: "bloc-chat-685f3.appspot.com",
    messagingSenderId: "245675345486"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeRoom: "",
      activeMessages: []
    };
    this.setActiveRoom = this.setActiveRoom.bind(this);
  }


  setActiveRoom(room) {
    this.setState({ activeRoom: room });
  }

  activeMessages (message) {
    this.setState({ activeMessages: message });
  }
    
  render() {
    return (
      <div >
        <h3>Bloc Chat</h3>
        <div className='content-grid mdl-grid' >
          <div className='mdl-cell mdl-cell--3-col'> 
            <RoomList firebase={firebase} setActiveRoom={this.setActiveRoom}/>
          </div>
          <div className='mdl-cell mdl-cell--9-col'>
          <h4>{!this.state.activeRoom.name ? "Select or create a room" : this.state.activeRoom.name}</h4>
          { this.state.activeRoom ?
        (<MessageList firebase={firebase} setActiveRoom={this.state.activeRoom.key} />) : (null)
        }
          </div>
        </div>
      </div>
    );
  }
}


export default App;
