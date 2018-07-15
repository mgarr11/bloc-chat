import React, { Component } from 'react';
//import RoomList from './RoomList';
//import User from './User.js'

class MessageList extends Component {
    constructor(props){
        super(props);
    
            this.state = {
            username: "",
            content: "",
            sentAt: "",
            roomId: "",
            messages: []
            }   

            this.messagesRef = this.props.firebase.database().ref('messages');
            this.handleChange = this.handleChange.bind(this);
            this.createMessage = this.createMessage.bind(this);
        }

        handleChange(e) {
            e.preventDefault();
            this.setState({
                content: e.target.value,
                roomId: this.props.setActiveRoom,
                username: this.props.currentUser
            })
        }

        createMessage(e) {
            e.preventDefault();
            this.messagesRef.push({ 
                //username: this.state.username,
                username: this.props.user ? this.props.user.displayName : "Guest",
                content: this.state.content,
                sentAt: this.state.sentAt,
                roomId: this.state.roomId
            });

            this.setState({ username: "", content: "", sentAt: "", roomId: "" })
            

        }
        
        componentDidMount() {
            this.messagesRef.on('child_added', snapshot => {
                const message = snapshot.val();
                message.key = snapshot.key;
                this.setState({ messages: this.state.messages.concat( message ) })
            });
        }
        

    render () {

        const form = (
            <form onSubmit={this.createMessage}>
                <input type="text" value={this.state.content} onChange={this.handleChange}/>
                <input type="submit" value="Send" /> 
            </form>
        );

        const MessageList = ( this.state.messages.map((message ) => {
            if (message.roomId === this.props.setActiveRoom) {
                return <p key={message.key}> {message.username} : {message.content} </p>
            }
            return null; 
        })
    );
         

            return (
                <div> {MessageList}
                    <div>Write a message: {form}</div>
                </div>
            );
        }


       
}

export default MessageList;
