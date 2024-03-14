import {useState} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

const Login = props => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [validationText, setValidationText] = useState("");
    
    if (Cookies.get('jwt_token') === 'authenticated') {
        return <Redirect to="/" />;
    }

    const usernameChange = event => setUsername(event.target.value)
    const passwordChange = event => setPassword(event.target.value)

    const onLogin = event => {
        event.preventDefault();
        if (username === 'jithendra' && password==='bandi') {
            setValidationText("");
            Cookies.set('jwt_token', 'authenticated', {expires: 30})
            const {history} = props;
            history.replace('/');
        }
        else if (username === "" && password !== "") setValidationText("Username can't be empty");
        else if (username !== "" && password === "") setValidationText("Password can't be empty")
        else if (username === "" && password === "") setValidationText("Username and Password can't be");
        else if (username !== "" && password !== "") setValidationText("Invalid Username or Password");
    }
    return(
        <div className='login-container pt-5'>
        <div className="d-flex flex-row justify-content-center">
            <div className='text-center p-4'>
                <h1 className='mb-3 text-primary'>Login Credentials</h1>
                <h5 className='text-success'>username: jithendra</h5>
                <h5 className='text-success'>password: bandi</h5>
            </div>
        </div>
        <h1 className='text-center text-primary mt-5 mb-3'>Login</h1>
        <div className='d-flex flex-row justify-content-center'>
            <form onSubmit={onLogin} className='login-form p-4'>
                <div className='d-flex flex-column mb-3'>
                    <label htmlFor='username'>Username:</label>
                    <input className='login-input bg-transparent' type='text' value={username} id="username" onChange={usernameChange} />
                </div>

                <div className='d-flex flex-column mb-3'>
                    <label htmlFor='password'>Password:</label>
                    <input className='login-input bg-transparent' type='password' value={password} id="password" onChange={passwordChange} />
                </div>
                <div className="text-center">
                    <button type='submit' className='btn btn-success mb-3 w-100'>Login</button>
                </div>
                <p className='err-msg text-danger'>{`*${validationText}`}</p>
                    
            </form>
        </div>
        </div>
    );
    
}

export default Login