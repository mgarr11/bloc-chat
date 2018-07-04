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

    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) })
        });
    }



    render () {
        const roomList = this.state.rooms.map((room) =>
        <div key={room.key}>{room.name}</div>
         );
        return (
          <div className='content-grid mdl-grid'>
            <div className='mdl-cell mdl-cell--3-col'>Bloc Chat{roomList}
                <ul></ul>
            </div>
            <div className='mdl-cell mdl-cell--9-col'>
            </div>
          </div>
        );
    }

}


export default RoomList;