import Cookies from 'js-cookie';
import {useState, useEffect } from 'react';
import { IoIosLogOut } from "react-icons/io";
import JokeItem from '../JokeItem';
import './index.css'

const Home = props => {
    const [jokesData, setJokes] = useState([]);
    const fetchJokes = async () => {
        const response = await fetch("https://v2.jokeapi.dev/joke/any?format=json&blacklistFlags=nsfw,sexist&type=single&lang=EN&amount=10");
        const jokesData = await response.json();
        console.log(jokesData);
        setJokes(jokesData.jokes);
    }
    
    useEffect(() => {
        const initialJokes = () => {
            fetchJokes();
        };
        initialJokes();
    }, [])
    
    const onLogout = () => {
        Cookies.remove('jwt_token');
        const {history} = props;
        history.replace("/login");
    }
    return (
        <div className='home-container'>
            <nav className="d-flex justify-content-between">
                <img src="https://tse3.mm.bing.net/th?id=OIP.whjLp2gWv_CGiaqvhin66gHaEo&pid=Api&P=0&h=220" alt="laugh emoji" className="logo" />
                <h1 className='text-center text-primary'>Jokes</h1>
                <button type="button" className='btn btn-danger d-none d-sm-inline' onClick={onLogout}>Logout</button>
                <button type="button" className='btn btn-danger d-sm-none' onClick={onLogout}><IoIosLogOut /></button>
            </nav>
            <table>
                <thead>
                <tr>
                    <th>Category</th>
                    <th>Joke</th>
                </tr>
                </thead>
                <tbody>
                    {jokesData.map(eachJoke => <JokeItem key={eachJoke.id} jokeData={eachJoke} />)}
                </tbody>
            </table>
            <div className="text-center">
                <button type="button" className='btn btn-info m-3' onClick={fetchJokes}>More Jokes</button>
            </div>
        </div>
    )
}

export default Home;