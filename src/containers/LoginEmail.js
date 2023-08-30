import React from 'react';
import { browserHistory } from 'react-router';
import {
   getFirebase,
   firebaseConnect,
   pathToJS,
 } from 'react-redux-firebase';
 import { compose } from 'redux';
 import { connect } from 'react-redux';
 import UserForm from '../components/UserForm';


class LoginEmail extends React.Component {
    constructor(props){
     super(props);
     this.state = {error:''};
     this.login = this.login.bind(this);

    }
  login(values) {
      const firebase = getFirebase();
      firebase.login(values)
      .then(() => {
        browserHistory.push('/')
      })
      .catch(() => {
            this.setState({ error: 'Authentication failed' });
            });
  }


  render() {
    const { authError } = this.props;
    return (
    <div>
      <UserForm onSubmit={this.login} label="login" />
      <h5 className="text-center">Do not have an account? <button onClick={()=>{browserHistory.push('/SignUp');}}> Sign Up&Login</button></h5>
      <h1 className="text-center">{this.state.error}</h1>
      <h3 className="text-center">{authError&&authError.message}</h3>
    </div>
  );
  }
}

export default compose(
  firebaseConnect(),
  connect(
    (state) => ({
        authError: pathToJS(state.firebase, 'authError'),
    })
  )
)(LoginEmail)
