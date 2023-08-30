import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import CircularProgress from 'material-ui/CircularProgress';
import { compose } from 'redux';
import {
   firebaseConnect,
   isLoaded,
   pathToJS,
   getFirebase
 } from 'react-redux-firebase';


class Home extends React.Component {
    login(provider) {
        const firebase = getFirebase();
        firebase.login({
           provider: provider,
           type: 'redirect'
       });

    }
    logout(){
         const firebase = getFirebase();
         firebase.logout();
    }
    checkProfile(){
        const { profile } = this.props;
        if(!profile){
            return (
                    <div className="text-center">
                        <h4>Login options:</h4>
                        <RaisedButton primary={true} className="logButton" label='facebook'  onClick={()=> this.login('facebook')}/>
                        <RaisedButton primary={true} className="logButton" label='google'  onClick={()=> this.login('google')}/>
                        <RaisedButton primary={true} style={{backgroundColor:'red'}} className="logButton" label='tweeter'  onClick={()=> this.login('twitter')}/>
                        <RaisedButton primary={true} className="logButton" label='github'  onClick={()=> this.login('github')} />
                        <RaisedButton primary={true} label="Email" onClick={()=>{browserHistory.push('/loginEmail'); }} />
                    </div>
            );
        } else {
            if(!profile.displayName){
                return (
                    <div className="text-center">
                       <h4>hi, {profile.username}</h4>
                       <RaisedButton primary={true} className="logButton"  label={'Logout'}  onClick={this.logout}/>
                   </div>
                );
            }else{
                return (
                    <div className="text-center">
                         <h4>Hi, { profile&&profile.displayName}</h4>
                         <img src = {profile.avatarUrl} />
                         <div>
                             <RaisedButton primary={true} className="logButton"  label={'Logout from '+ profile&&profile.providerData[0].providerId}  onClick={this.logout}/>
                         </div>

                    </div>
                );
            }
        }

    }
    render() {
        const { profile } = this.props;
        return (
            <div>
                {
                    (!isLoaded(profile)
                    )?(
                        <div className = "load">
                            <CircularProgress size={80} thickness={5} />
                        </div>
                    ):(
                         <div>
                            {this.checkProfile()}
                        </div>
                    )
                }
            </div>
        );
    }
}

export default compose(
  firebaseConnect(),
  connect(
    (state) => ({
        auth: pathToJS(state.firebase, 'auth'), // in v2 todos: state.firebase.auth
        authError: pathToJS(state.firebase, 'authError'),
        profile: pathToJS(state.firebase, 'profile')
    })
  )
)(Home)
