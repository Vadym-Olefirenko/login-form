import React, {useState} from 'react';
import axios from 'axios';
import './LoginForm.css'

const Form = (props) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState();
    
    const handleLogin = () => {
        axios.post(`http://142.93.134.108:1111/login?email=${login}&password=${password}`, {
            email: login,
            password: password
          })
          .then(function (response) {
            console.log(response);

            let {status_code, body} = response.data;

            let tok = body.access_token; 
            setToken(tok);
            console.log(tok)

            if(status_code === 401) {
                setStatus('User is not defined!');
            }
            props.history.push('/dashboard');

            axios.get(`http://142.93.134.108:1111/me`, {
                headers: {
                    Authorization:'Bearer ' + tok
                }
            })
            .then((res) => {
                console.log(res);
            })
          })
          .catch(function (error) {
            console.log(error);
          });
    }


    const handleRegister = () => {
        axios.post('http://142.93.134.108:1111/sign_up', {
            email: login,
            password: password
          })
          .then(function (response) {
            console.log(response);
            setStatus('User was registred!');
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    return (
        <div className="form__container">
           <div className="form">
           <h2>Log in or register now!</h2>
            <div className="inputBox">
                <label htmlFor="login">Login</label><br/>
                <input 
                    type="text" 
                    id="login" 
                    onChange={(e) => {
                        setLogin(e.target.value);
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
                    }}
                />
            </div>
            {status && <><small style={{ color: 'red' }}>{status}</small><br /></>}<br />
            <div className="buttons__box">
            <input type="button" className="btn" value="Login" onClick={handleLogin} disabled={loading} />
            <input type="button" className="btn" value="Sign Up" onClick={handleRegister} disabled={loading} />
            </div>
            
           </div>
        </div>
    )
}



export default Form;