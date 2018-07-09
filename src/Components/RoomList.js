import React, { Component } from 'react';
//import * as firebase from 'firebase';

class RoomList extends Component {
  constructor(props){
    super(props);


        this.state = {
        rooms: [], 
        name: ""
        };

        this.roomsRef = this.props.firebase.database().ref('rooms');
        this.changeRoom = this.changeRoom.bind(this);
        this.addRoom = this.addRoom.bind(this);
        

    }

    changeRoom (event) {
        //event.preventDefault();
        this.setState({ name: event.target.value });

    }

    addRoom (event) {
        event.preventDefault();
        //if (!this.state.roomName) {return}
        //const newRoomName = this.state.rooms === //.arr(rooms => this.state.newRoomName === rooms);
        //const newRoomName = 
        //this.roomsRef.name = newRoomName; // moved up oneline
        this.roomsRef.push({ name: this.state.name });
        //this.roomsRef.addRoom ();
        //this.roomsRef.name = newRoomName;
        this.setState({name: ""});// replaced `rooms.target.value` with `newRoomName`
        //console.log (newRoomName); 


    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            //var room = { data: snapshot.val(), key: snapshot.key };
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) })
        });
    }



    render () {

        const form = (
            <form onSubmit={this.addRoom}>
                <input type="text" value={this.state.name} onChange={this.changeRoom}/>
                <input type="submit" value="Create" /> 
            </form>
        );

        const roomList = this.state.rooms.map((room) => 
           <div key={room.key}>{room.name}</div>
         );
        return (
          <div className='content-grid mdl-grid'>
            <div className='mdl-cell mdl-cell--3-col'>Add Rooms: {form}, Chat Rooms:{roomList}
            </div>
            <ul></ul>
            <div className='mdl-cell mdl-cell--9-col'>
            </div>
          </div>
        );
    }

}


export default RoomList;