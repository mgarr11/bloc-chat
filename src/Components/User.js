import React, {Component} from 'react';

class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
       this.handleSignIn=this.handleSignIn.bind(this);
       this.handleSignOut=this.handleSignOut.bind(this);
    }

    handleSignIn () {
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup( provider );
    }

    handleSignOut () {
        this.props.firebase.auth().signOut();
    }

    handlChange (user){
        const signInStatus = user;
        if (signInStatus) {
            this.handleSignOut();
        }
        else if (signInStatus === null){
            this.handleSignIn(); 
        }

    }

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged( user => {
            this.props.setUser(user);
          });
          
    }

    render () {
        return (
            <div>{(this.props.currentUser ? this.props.currentUser.displayName : "Sign in or Sign-up to Chat!")}
                <button onClick={this.handleSignIn} onChange={(user)=> this.handlChange(user)}> 
                    {
                        (this.props.currentUser)=== null ? 
                        <span>Sign Up / Sign In</span>
                        :
                        <span>Signed In</span>
                    }
                </button>
                    {(this.props.currentUser) !== null ? <button onClick={this.handleSignOut}>Sign Out</button> : (null) }
            </div>
        );
    }
}

export default User;
