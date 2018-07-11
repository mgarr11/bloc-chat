import React, { Component } from 'react';

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
                roomId: this.props.activeRoom
            })
        }

        createMessage(e) {
            e.preventDefault();
            this.messagesRef.push({ 
                username: this.state.username,
                content: this.state.content,
                sentAt: this.state.sentAt,
                roomId: this.props.activeRoom
            });

            this.setState({ username: "", content: "", sentAt: "", roomId: "" })
            

        }
        
        componentDidMount() {
            this.messagesRef.on('child_added', snapshot => {
                //var room = { data: snapshot.val(), key: snapshot.key };
                const message = snapshot.val();
                message.key = snapshot.key;
                this.setState({ messages: this.state.messages.concat( message ) })
            });
        }
        

    render () {

        const activeRoom = this.props.activeRoom;

        const form = (
            <form onSubmit={this.createMessage}>
                <input type="text" value={this.state.content} onChange={this.handleChange}/>
                <input type="submit" value="Send" /> 
            </form>
        );

        const MessageList = ( this.state.messages.map((message ) => {
            if (message.roomId === activeRoom) {
                return <li key={message.key}> {message.content}</li>
            }
            return null; 
        })
    );
         

            return (
                <div> Write a message: {form}
                    <ul>{MessageList}</ul>
                </div>
            );
        }


       
}

export default MessageList;
