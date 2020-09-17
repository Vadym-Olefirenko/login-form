import React, {useState} from 'react';
import { withRouter } from "react-router";
import axios from 'axios';
import './LoginForm.css'

const Form = (props) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState(null);
    
    const handleLogin = () => {
        if (login.length > 0 && password.length > 0) {
            axios.post(`http://142.93.134.108:1111/login?email=${login}&password=${password}`, {
                email: login,
                password: password
            })
            .then((response) => {
                let {status_code, body} = response.data;

                let logToken = body; 

                if(status_code === 401) {
                    setStatus('User is not defined!');
                } else {
                    // localStorage.setItem('accsess_token', response.data.body.access_token);
                    props.tokenValue(logToken);
                    props.history.push('/dashboard');
                }
          })
          .catch((error) => {
            console.log(error);
          });
        } else {
            setStatus('Fill in all fields!');
        }
        
    }


    const handleRegister = () => {
        if (login.length > 0 && password.length > 0) {
            axios.post('http://142.93.134.108:1111/sign_up', {
                email: login,
                password: password
            })
            .then((response) => {
                console.log(response);
                setStatus('User was registred!');
            })
            .catch((error) => {
                console.log(error);
            });
        } else {
            setStatus('Fill in all fields!');
        }
        
    }

    return (
        <div className="form__container">
           <form className="form">
            <h2>Log in or sign up now!</h2>
                <div className="inputBox">
                    <label htmlFor="login">Login</label><br/>
                    <input 
                        type="text" 
                        id="login" 
                        onChange={(e) => {
                            setLogin(e.target.value);
                            // validator();
                        }}
                    />
                </div>
                <div className="inputBox">
                    <label htmlFor="password">Password</label><br/>
                    <input 
                        type="password" 
                        id="password" 
                        onChange={(e) => {
                            setPassword(e.target.value)
                            // validator();
                        }}
                    />
                </div>
                {status && <><small style={{ color: 'red' }}>{status}</small><br /></>}<br />
                <div className="buttons__box">
                <input type="button" className="btn" value="Login" onClick={handleLogin}/>
                <input type="button" className="btn" value="Sign Up" onClick={handleRegister}/>
                </div>
            
           </form>
        </div>
    )
}



export default withRouter(Form);