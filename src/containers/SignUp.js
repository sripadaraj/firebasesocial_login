import React from 'react';
import {
   getFirebase,
   firebaseConnect,
   pathToJS,
   isLoaded,
 } from 'react-redux-firebase';
 import { compose } from 'redux';
 import { connect } from 'react-redux';
  import CircularProgress from 'material-ui/CircularProgress';
 import UserForm from '../components/UserForm';


class SignUp extends React.Component {
    constructor(props){
     super(props);
     this.state = {error:''};
     this.createNewUser = this.createNewUser.bind(this);
    }

  createNewUser(values) {
      const email = values.email;
      const password = values.password;
      const username = values.username;
      const firebase = getFirebase();
      firebase.createUser(
          { email, password },
          { username, email }
      )
    //   .then(() => {
    //     browserHistory.push('/');
    //   })
      .catch(() => {
            this.setState({ error: 'Authentication failed' });
        });
  }


  render() {
    const { authError, profile } = this.props;
    return (
    <div>
    {
                (!isLoaded(profile))?(<div className = "load"><CircularProgress size={80} thickness={5} /></div>):(
                    (!profile)?
                    (
                        <div>
                            <UserForm onSubmit={(this.createNewUser)} label="Sign Up" />
                            <h1 className="text-center">{this.state.error}</h1>
                            <h3 className="text-center">{authError&&authError.message}</h3>
                        </div>
                    ):(
                        <div>
                            <h1 className="text-center">Hi, {profile&&profile.username}</h1>
                        </div>
                    )

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
        authError: pathToJS(state.firebase, 'authError'),
        profile: pathToJS(state.firebase, 'profile')
    })
  )
)(SignUp)
