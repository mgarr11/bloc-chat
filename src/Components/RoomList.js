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
        this.setState({ name: event.target.value });

    }

    addRoom (event) {
        event.preventDefault();
        this.roomsRef.push({ name: this.state.name });
        this.setState({name: ""});

    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
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
           <li key={room.key} onClick={() => this.props.setActiveRoom( room)}>{room.name}</li>
         );
        return (
          <div >
          <ul>Available chat rooms:{roomList} Create a new room: {form} </ul>
          </div>
        );
    }

}


export default RoomList;