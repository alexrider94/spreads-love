import React, { Component } from 'react';
import {render} from 'react-dom';
import { 
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import { withRouter } from 'react-router';

class SigninForm extends Component {
    render() {
        return (
            <h2>I'm sign in form</h2>
        );
     }
}

class UserProfile extends Component {
    render() {
        const { user } = this.props;

        return (
            <div>
                <h2>User Profile</h2>
                <span>{ user.name }</span>
            </div>
        );
    }
}

class SignupForm extends Component {
    render() {
        const {
            state: {
                name,
                email,
                password
            },
            onNameUpdate,
            onEmailUpdate,
            onPasswordUpdate,
            onSubmit,
            history
        } = this.props;

        return (
            <div>
                <h2>I'm sign up form</h2>

                <div>
                    <input 
                        type="text"
                        onChange={ e => onNameUpdate(e.target.value) }
                        value={name}
                        placeholder="Your name" />
                </div>
                <div>
                    <input 
                        type="email"
                        onChange={e => onEmailUpdate(e.target.value)}
                        value={email}
                        placeholder="Your email" />
                </div>
                <div>
                    <input 
                        type="password"
                        onChange={e => onPasswordUpdate(e.target.value)}
                        value={password}
                        placeholder="Your password" />
                </div>
                <div>
                    <button type="button" onClick={ () => {
                        onSubmit();
                        history.push('/app/user/profile');
                     }}> Continue </button>
                </div>
            </div>
        );
    }
}

const SignupFormWithRouter = withRouter(SignupForm);

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            signUpForm: {
                name: '',
                email: '',
                password: '',
            },
        };
    }

    onNameUpdate(name) {
        const { signUpForm } = this.state;

        const updatedForm = Object.assign({}, signUpForm , { name });

        this.setState({
            signUpForm: updatedForm,
        });
    }

    onEmailUpdate(email){
        const { signUpForm } = this.state;

        const updatedForm = Object.assign({}, signUpForm, { email });

        this.setState({
            signUpForm: updatedForm,
        });
    }

    onPasswordUpdate(password){
        const { signUpForm } = this.state;

        const updatedForm = Object.assign({}, signUpForm, { password });

        this.setState({
            signUpForm: updatedForm,
        });
    }

    onSignUpSubmit(){
        const {signUpForm} = this.state;

        this.setState({
            currentUser:{
                name: signUpForm.name,
                email: signUpForm.email,
            },
            signUpForm: {
                name:'',
                email: '',
                password: '',
            },
        });
    }

    render() {
        const { currentUser, signUpForm} = this.state;
        return (
            <Router>
                <div>
                    <ul>
                        <li><Link to="/app/signin">Sign in</Link></li>
                        <li><Link to="/app/signup">Sign up</Link></li>
                    </ul>
                </div>
                <div>
                    <Route path="/app/signup"  render={ ()=> (
                        <SignupForm 
                            state={ signUpForm }
                            onNameUpdate={this.onNameUpdate.bind(this)}
                            onEmailUpdate={this.onEmailUpdate.bind(this)}
                            onPasswordUpdate={this.onPasswordUpdate.bind(this)}
                            onSubmit = { this.onSignUpSubmit.bind(this)}
                            />
                    )} />
                    <Route path="/app/signin"  Component={SignupForm} />
                    <Route path="/app/user/profile" render={ () => (
                        <UserProfile user={ currentUser } />
                    )} />
                </div>
            </Router>
        );
    }
}

const container = document.getElementById('root');

render(
    <App />,
    container
);

