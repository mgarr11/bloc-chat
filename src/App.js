import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
//import { Route, Link } from 'react-router-dom';
import './App.css';
import * as firebase from 'firebase';
import RoomList  from './Components/RoomList';

//src="https://www.gstatic.com/firebasejs/5.2.0/firebase.js"

  // Initialize Firebase
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
  render() {
    return (
      <aside>
        <div className="App">
          <RoomList firebase={firebase}/>
        </div>
      </aside>
    );
  }
}

export default App;
