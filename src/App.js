import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
//import { Route, Link } from 'react-router-dom';
import './App.css';
import * as firebase from 'firebase';
import RoomList  from './Components/RoomList';
import MessageList from './Components/MessageList';
import User from './Components/User';


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
      activeMessages: [],
      user: ""
    };
    this.setActiveRoom = this.setActiveRoom.bind(this);
    this.setUser=this.setUser.bind(this);
  }


  setActiveRoom(room) {
    this.setState({ activeRoom: room });
  }

  activeMessages (message) {
    this.setState({ activeMessages: message });
  }

  setUser (user) {
    this.setState({ user: user });
  }
    
  render() {
    return (
      <div >
        <h3>Bloc Chat</h3>
        <User firebase={firebase} setUser={this.setUser} currentUser={this.state.user}/>
        <div className='content-grid mdl-grid' >
          <div className='mdl-cell mdl-cell--3-col'> 
            <RoomList firebase={firebase} setActiveRoom={this.setActiveRoom} currentUser={this.state.user}/>
 
          </div>
          <div className='mdl-cell mdl-cell--9-col'>
          <h4>{!this.state.activeRoom.name ? "Select or create a room" : this.state.activeRoom.name}</h4>
          <MessageList firebase={firebase} setActiveRoom={this.state.activeRoom.key} user={this.state.user} />
          </div>
        </div>
      </div>
    );
  }
}


export default App;
